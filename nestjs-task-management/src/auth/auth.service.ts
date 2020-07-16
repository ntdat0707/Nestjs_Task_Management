import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTO } from './auth-dto/auth-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth-dto/jwt-payload.interface';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(authDTO: AuthDTO): Promise<string> {
        return this.userRepository.signUp(authDTO);
    }

    async signIn(authDTO: AuthDTO):Promise<{accessToken: string}> {
        const username = await this.userRepository.validatePassword(authDTO);
        if (!username) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}