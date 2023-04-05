import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from "bcryptjs";
import { User, UserDocument } from 'src/users/schemes/user.scheme';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: String, password: string): Promise<User> {
        const user: User = await this.userService.getUserByEmail(email);

        if (!user) {
            throw new NotFoundException('User Not Valid ##!##')
        }

        // const isPasswordValid: Boolean = await bcrypt.compare(password, user.password as string).then(function (result: Boolean) {
        //     return result;
        // });

        // if (!isPasswordValid) {
        //     throw new NotFoundException('User Not Valid ##!##')
        // }

        return user;

    }


    async login(loginDTO: LoginDTO) {
        return {
            access_token: this.jwtService.sign(loginDTO),
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    }

    verify(token: string): Promise<User> {

        const decoded = this.jwtService.verify(token, {
            secret: process.env.BCRYPT_SALT
        })

        const user = this.userService.getUserByEmail(decoded.email);

        if (!user) {
            throw new Error('Unable to get the user from decoded token.');
        }

        return user;
    }
}
