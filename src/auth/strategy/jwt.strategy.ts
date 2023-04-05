import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schemes/user.scheme';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.BCRYPT_SALT,
        });
    }

    async validate(validationPayload: { email: string, sub: string }): Promise<User> {
        const result = this.usersService.getUserByEmail(validationPayload.email);
        return result;
    }
}