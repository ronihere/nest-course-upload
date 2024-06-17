import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Course } from './Course.schema';
// Define enum for user roles
export enum UserRole {
    STUDENT = 'student',
    ADMIN = 'admin',
}

@Schema()
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ default: UserRole.STUDENT, enum: UserRole })
    role: UserRole;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    createdby: User // Reference to another PUser

    @Prop({type : [{type: mongoose.Schema.Types.ObjectId, ref:'Course'}]})
    favcourses: Course[]
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (this: User, next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Define and export the mongoose model based on the schema
