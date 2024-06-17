import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CourseService {
    constructor(private readonly cloudinaryService : CloudinaryService){}
    async fileUpload(file: string, fileName: string) {
        return await this.cloudinaryService.uploadImage(file, fileName).catch((err) => {
            console.log(err);
            throw new BadRequestException('Invalid file type.', err);
        });
    }
}
