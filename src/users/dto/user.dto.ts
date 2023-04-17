import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsAlpha, IsDate, IsEmail, IsNotEmpty, IsEnum, IsEmpty, IsDateString, ValidateIf, MinDate } from "class-validator";
import { GenderPipe } from "../custom-validation/gender.validation";

export class UserDTO {

    @ApiProperty({ description: 'username', example: 'epba' })
    @IsNotEmpty()
    username: String;

    @ApiProperty({ description: 'name', example: 'Eko Purnomo' })
    @IsNotEmpty()
    name: String;

    @ApiProperty({ description: 'username', example: 'ekopurnomo.office@gmail.com' })
    @IsEmail()
    email: String;

    @ApiProperty({ description: 'password', example: '@#FSOjfjsdoj' })
    @IsNotEmpty()
    password: String;

    @ApiProperty({ description: 'gender between MALE | FEMALE', example: 'Male' })
    @IsNotEmpty()
    @ValidateIf((object, value) => !['Male', 'Female'].includes(value))
    gender: String;

    @IsNotEmpty()
    @IsDateString()
    birth_date: Date;

}