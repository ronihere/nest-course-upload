import { IsDefined, IsEmail } from "class-validator"

export class SignInDto {
    @IsDefined()
    @IsEmail()
    email: string

    @IsDefined()
    password: string
}