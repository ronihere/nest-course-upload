import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Course {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, unique: true })
    url: string;

    @Prop()
    resources: string[];

}

export const CourseSchema = SchemaFactory.createForClass(Course);



// Define and export the mongoose model based on the schema
