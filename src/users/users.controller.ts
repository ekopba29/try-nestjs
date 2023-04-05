import { Body, Controller, Get, Param, ParseBoolPipe, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestWithUser, User, UserScheme } from './schemes/user.scheme';
import { UserDTO } from './dto/user.dto';
import { ObjectId, isValidObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { ParseObjectIdPipe } from './custom-validation/object-id.validation';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';
import { ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('/api/user')
@ApiTags('User')
export class UsersController {
    constructor(
        private userService: UsersService
    ) { }

    @Post('/register')
    @ApiOperation({ summary: 'Register new user' })
    @ApiCreatedResponse({
        type: UserDTO,
    })
    @UsePipes(ValidationPipe)
    createUser(@Body() userDto: UserDTO): Promise<User> {
        return this.userService.createUser(userDto);
    }

    @Get('/profile')
    @ApiSecurity('access-token')
    @ApiOperation({ summary: 'Get Logged In User Profile' })
    @ApiOkResponse({ type: User })
    @UseGuards(JwtAuthGuard)
    getProfile(
        @Req() request: any
    ): any {

        console.log(request)
        const user = <UserDTO>request.user;
        return user;
    }

    @ApiSecurity('access-token')
    @Patch("/profile/update")
    @ApiOperation({ summary: 'Update Logged In User Profile' })
    @UseGuards(JwtAuthGuard)
    // @UsePipes(ValidationPipe)
    updateUser(
        @Body() userDTO: UserDTO,
        @Req() request: any
    ): Promise<User> {
        const user: any = <UserDTO>request.user;
        return this.userService.updateUser(user._id, userDTO)
    }

}
