import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserRole } from "src/Schema/User.schema";
import { CreateUserDto } from "./dto/User.dto";


export type TReqUser = {
    sub: string,
    email: string,
    username: string,
    role: string,
    iat: number,
    exp: number
}
@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    

    async createUser(createUser: CreateUserDto, requestingUser : TReqUser) {
        const isDuplicate = await this.userModel.findOne({ email: createUser.email })
        console.log('requestinguser', requestingUser);
        if (isDuplicate) {
            throw new HttpException("Duplicate email id", HttpStatus.CONFLICT);
        }
        if (createUser.role === UserRole.ADMIN && requestingUser.role !== UserRole.ADMIN) {
            throw new HttpException("Only Admin can create another Admin User", HttpStatus.UNAUTHORIZED)
        }
        const user = await this.userModel.create({
            ...createUser,
            createdby : requestingUser.sub
        });
        console.log('createdUser', user);
        return  (await user.save()).toObject();
    }
    async findByEmail(email: string) {
        return await this.userModel.findOne({ email: { $eq: email } }).lean();
    }

    getAllUsers() {
        return this.userModel.find();
    }
}