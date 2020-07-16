import { MinLength, MaxLength, Matches, IsString } from 'class-validator'
export class AuthDTO {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    // @Matches(
    //     /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    //     { message: 'password too weak' },
    // )
    password: string;

}