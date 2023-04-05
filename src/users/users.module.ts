import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserScheme } from './schemes/user.scheme';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserScheme }
        ]),
    ],
    providers: [UserRepository, UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule { }
