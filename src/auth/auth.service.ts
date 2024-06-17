import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/User.service';
import * as bcrypt from "bcryptjs";


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        // if (user?.password !== pass) {
        const isCorrectPassword =await bcrypt.compare(pass, user.password);
        if (!isCorrectPassword) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user._id, email: user.email, username: user.username, role: user.role };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.jwtconst,
                expiresIn: '3600s'
            }),
            role: user.role,
            username: user.username
        };
    }
}