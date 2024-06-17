import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TReqUser, UserService } from './User.service';
import { CreateUserDto } from './dto/User.dto';
export type TReq = Request & {
    user: TReqUser
}
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Req() request: TReq) {
        const {password ,...rest} = await this.userService.createUser(createUserDto,request.user);
        return rest;
    }

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
}
