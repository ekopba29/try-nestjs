import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { ObjectId, SchemaTypes, Types } from "mongoose";
import { AbstractDocument } from "src/database/abstract.scheme";


@Schema()
export class User {

    @ApiProperty({ description: 'username user', example: 'epba' })
    @Prop()
    username: String;

    @ApiProperty({ description: 'name user', example: 'Eko Purnomo' })
    @Prop()
    name: String;

    @ApiProperty({ description: 'email user', example: 'ekopurnomo.office@gmail.com' })
    @Prop()
    email: String;

    @Prop()
    password: String;

    @ApiProperty({ description: 'gender', enum: ['Male', 'Female'] })
    @Prop({ type: String, enum: ['Male', 'Female'] })
    gender: String;

    @Prop()
    birth_date: Date;

    @ApiProperty({ description: 'about user', example: 'System Developer' })
    @Prop()
    about: String;

    @ApiProperty({ description: 'weight of user', example: 70 })
    @Prop()
    weight: Number;

    @ApiProperty({ description: 'height of user', example: 170 })
    @Prop()
    height: Number;

    @ApiProperty({ description: 'shio user', example: 'Maung' })
    @Prop()
    shio: String;

    @ApiProperty({ description: 'zodiac user', example: 'Gemini' })
    @Prop()
    zodiac: String;

    @ApiProperty({ description: 'user interests', examples: ['coding', 'coding', 'coding'] })
    @Prop([String])
    interests: String[];

}


export const UserScheme = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
export type RequestWithUser = Request & User
