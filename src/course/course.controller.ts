import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService : CourseService){}
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: 'public/img',
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
        }),
    )
    async upload(@UploadedFile() file: Express.Multer.File) {
        const result = await this.courseService.fileUpload(file.path, 'defaultname');
        await this.deleteUploadedFile(file.path);
        return result;
    }

    private async deleteUploadedFile(filePath: string) {
        const fs = require('fs').promises; // Use promises for async/await

        try {
            await fs.unlink(filePath); // Delete the file using fs.promises.unlink
            console.log('Temporary file deleted successfully:', filePath);
        } catch (error) {
            console.error('Error deleting temporary file:', error);
            // Handle deletion errors gracefully (e.g., log, notify admin)
        }
    }

}
