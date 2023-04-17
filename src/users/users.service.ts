import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './schemes/user.scheme';
import { UserDTO } from './dto/user.dto';
import { getSign, getZodiac } from 'horoscope';
import { ObjectId } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) { }

    async getUserById(id: ObjectId): Promise<User> {
        return this.userRepository.findById(id);
    }

    async getUserByEmail(email: String): Promise<User> {
        return this.userRepository.findByEmail(email);
    }

    async updateUser(_id: String, updateData: Partial<User>): Promise<User> {

        if (updateData.birth_date) {
            const birthDate = new Date(updateData.birth_date);
            const [day, month, year]: [Number, Number, Number] = [birthDate.getDay(), birthDate.getMonth() + 1, birthDate.getFullYear()];
            const zodiac = getSign({ month: month, day: day })
            const shio = getZodiac(year)
            updateData = Object.assign({ ...updateData, zodiac, shio })
        }

        return this.userRepository.findOneAndUpdate({ _id }, updateData);
    }

    async createUser(userDto: UserDTO): Promise<User> {
        const paramUser: User = this.buildParamsCreateUser(userDto);
        return this.userRepository.create(paramUser);
    }

    private buildParamsCreateUser(userDto: UserDTO): User {

        let weight: Number, height: Number = 0;
        const about: String = '';
        const interests: [] = []

        const birthDate = new Date(userDto.birth_date);
        const [day, month, year]: [Number, Number, Number] = [birthDate.getDate(), birthDate.getMonth() + 1, birthDate.getFullYear()];
        const zodiac = getSign({ month, day })
        const shio = getZodiac(year)

        const paramUser: User = {
            ...userDto,
            zodiac,
            shio,
            weight,
            height,
            about,
            interests
        };

        return paramUser;
    }
}
