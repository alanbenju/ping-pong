import request from 'supertest'
import app from '../src/server'
import adminService from '../src/services/admin.service';
import { adminMock, gameMock1, gameMock2, gameMock3, gameMock4, isLoggedInMock, userMock1, userMock2, userMock3, userMock4 } from './mocks';
import createTestDatabase from './seed'

jest.mock('../src/middlewares/isLoggedIn', () => {
  const originalModule = jest.requireActual('../src/middlewares/isLoggedIn');
  return {
    __esModule: true,
    ...originalModule,
    isLoggedIn: jest.fn((req, res, next) => {
      next()
    }),
  };
});




/**
 * I'm doing all my tests (unit and e2e) in one file all together to work faster
 * I would have unit tests for each file/component/service and then e2e tests for each controller
 * Didn't add border cases or validation cases. Added the happy cases
 */


describe('All tests ', () => {

  let closedbConnection;
  let cleanDatabase;
  beforeAll(async () => {
    let { closeConnection, cleanDB } = await createTestDatabase()
    closedbConnection = closeConnection;
    cleanDatabase = cleanDB
  })

  afterAll(async () => {
    await closedbConnection()
  })

  afterEach(async () => {
    await cleanDatabase()
  })

  describe('Health', () => {
    test('It should respond with 200', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
    })
  })

  describe('Admin', () => {
    test('It should respond empty', async () => {
      const response = await adminService.get()
      expect(response.length).toBe(0)
    })

    test('Signup', async () => {
      const { body: { result } } = await request(app).post('/admin/signup').send(adminMock)
      const response = await adminService.get()
      expect(response.length).toBe(1)
      expect(response[0].username).toBe(adminMock.username)
      expect(result.access_token).not.toBe(null)
    })

    test('Login', async () => {
      await request(app).post('/admin/signup').send(adminMock)
      const { body: { result } } = await request(app).post('/admin/login').send(adminMock)
      expect(result.access_token).not.toBe(null)
    })
  })

  describe('Users', () => {
    test('It should respond empty', async () => {
      const { body: { result } } = await request(app).get('/users')
      expect(result.length).toBe(0)
    })

    test('Create an user', async () => {
      await request(app).post('/users').send(userMock1)
      const { body: { result } } = await request(app).get('/users')
      expect(result.length).toBe(1)
      expect(result[0].username).toBe(userMock1.username)
      expect(result[0].wins).toBe(0)
      expect(result[0].losses).toBe(0)
    })
  })

  describe('Games', () => {
    test('It should respond empty', async () => {
      const { body: { result } } = await request(app).get('/games')
      expect(result.length).toBe(0)
    })

    test('Create a game and update wins/losses in users', async () => {
      await request(app).post('/users').send(userMock1)
      await request(app).post('/users').send(userMock2)
      await request(app).post('/games').send(gameMock1)
      const { body: { result } } = await request(app).get('/users')

      expect(result[0].wins).toBe(1)
      expect(result[0].losses).toBe(0)
      expect(result[1].wins).toBe(0)
      expect(result[1].losses).toBe(1)

      const { body } = await request(app).get('/games')
      expect(body.result[0].winner_id).toBe(1)
      expect(body.result[0].loser_id).toBe(2)
    })
  })

  describe('Ranks', () => {
    test('Create games and retrieve rank', async () => {
      await request(app).post('/users').send(userMock1)
      await request(app).post('/users').send(userMock2)
      await request(app).post('/users').send(userMock3)
      await request(app).post('/users').send(userMock4)

      await request(app).post('/games').send(gameMock1)
      await request(app).post('/games').send(gameMock2)
      await request(app).post('/games').send(gameMock3)
      await request(app).post('/games').send(gameMock4)

      const { body: { result } } = await request(app).get('/users/rank')
      expect(result[0].id).toBe(1)
      expect(result[0].total).toBe(3)
      expect(result[0].win_percentage).toBe(100)

      expect(result[1].id).toBe(2)
      expect(result[1].total).toBe(2)
      expect(result[1].win_percentage).toBe(50)

      expect(result[2].id).toBe(3)
      expect(result[2].total).toBe(2)
      expect(result[2].win_percentage).toBe(0)

      expect(result[3].id).toBe(4)
      expect(result[3].total).toBe(1)
      expect(result[3].win_percentage).toBe(0)
    })
  })


})