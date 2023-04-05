import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
    @ApiProperty({ description: "user email", example: 'ekopurnomo.office@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: String;
    
    @ApiProperty({ description: "user password", example: 'ekopurnomo' })
    @IsNotEmpty()
    password: String;
}