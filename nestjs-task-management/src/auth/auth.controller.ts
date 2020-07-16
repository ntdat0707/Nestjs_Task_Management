import { Controller, Post, UsePipes, ValidationPipe, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './auth-dto/auth-dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth-dto/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authDTO: AuthDTO): Promise<string> {
        return this.authService.signUp(authDTO);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authDTO: AuthDTO):Promise<{accessToken: string}> {
        return this.authService.signIn(authDTO);
    }

    @Post('/test')
    @UseGuards(JwtAuthGuard)  //error challenge cannot undefine when use AuthGuard()
    test(@Req() req){
        console.log(req);
    }
}
