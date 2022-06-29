export const adminMock = {
    username: "test",
    password: "test"
}

export const gameMock1 = {
    winner_id: 1,
    loser_id: 2,
    winner_points: 21,
    loser_points: 18
}

export const gameMock2 = {
    winner_id: 1,
    loser_id: 3,
    winner_points: 21,
    loser_points: 18
}

export const gameMock3 = {
    winner_id: 1,
    loser_id: 4,
    winner_points: 21,
    loser_points: 18
}

export const gameMock4 = {
    winner_id: 2,
    loser_id: 3,
    winner_points: 21,
    loser_points: 18
}

export const userMock1 = {
    username: "test1"
}
export const userMock2 = {
    username: "test2"
}
export const userMock3 = {
    username: "test3"
}
export const userMock4 = {
    username: "test4"
}


export const isLoggedInMock = async (req, res, next) => {
    next()
}
