import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
class AuthService {
    constructor() {}

    async validatePass(adminPass, loginPass) {
        return await bcrypt.compare(loginPass, adminPass);
    }

    async encryptPassword(pass) {
        return await bcrypt.hash(pass, 10);

    }

    buildToken(admin) {
        const payload = { username: admin.username, sub: admin.id };
        const token = sign(payload, process.env.TOKEN_SECRET)
        return {
            access_token: token,
        };
    }
}

const authService = new AuthService()

export default authService