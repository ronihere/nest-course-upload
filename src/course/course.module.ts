import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  providers: [CourseService, CloudinaryService],
  controllers: [CourseController]
})
export class CourseModule {}
