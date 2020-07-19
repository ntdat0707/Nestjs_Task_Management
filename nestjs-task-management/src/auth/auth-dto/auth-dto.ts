import { MinLength, MaxLength, Matches, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
export class AuthDTO {
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @ApiProperty({type:String,description:'user name'})
    username: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({type:String,description:'password'})
    // @Matches(
    //     /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    //     { message: 'password too weak' },
    // )
    password: string;

}