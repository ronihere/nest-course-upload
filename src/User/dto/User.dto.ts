import {  IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { UserRole } from "src/Schema/User.schema";

export class CreateUserDto{
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string

    @IsEmail()
    email: string

    @IsOptional()
    role: UserRole
}