import { Body, Controller, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guards';
import { LoginDTO } from './dto/login.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseLoginDTO } from './dto/response-login.dto copy';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UsePipes(ValidationPipe)
    @UseGuards(LocalAuthGuard)
    
    @ApiOperation({ summary: 'Login User' })
    @ApiOkResponse({ type: ResponseLoginDTO })
    @ApiBody({ type: LoginDTO })
    
    async login(
        @Body() loginDTO: LoginDTO,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.login(loginDTO);
    }


}
