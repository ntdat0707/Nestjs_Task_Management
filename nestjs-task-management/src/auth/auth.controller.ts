import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth-dto/auth-dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth-dto/jwt-auth.guard';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @ApiCreatedResponse({ description: 'User Registration' })
    @ApiBody({ type: AuthDTO })
    signUp(@Body(ValidationPipe) authDTO: AuthDTO): Promise<string> {
        return this.authService.signUp(authDTO);
    }

    @Post('/signin')
    @ApiOkResponse({ description: 'User Login' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiBody({ type: AuthDTO })
    signIn(@Body(ValidationPipe) authDTO: AuthDTO): Promise<{ accessToken: string }> {
        return this.authService.signIn(authDTO);
    }

    @Post('/test')
    @UseGuards(AuthGuard('jwt'))  //error challenge cannot undefine when use AuthGuard()
    test(@GetUser() user: User) {
        console.log('Test User:', user);
    }
}
