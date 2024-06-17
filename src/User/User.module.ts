import { Module } from "@nestjs/common";
import { UserService } from "./User.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/Schema/User.schema";
import { UserController } from "./User.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],providers:[UserService], controllers:[UserController]
})
export default class UserModule{}