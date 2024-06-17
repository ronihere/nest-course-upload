import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor() {
        v2.config({
            cloud_name: process.env.cloudinaryCloudName,
            api_key: process.env.cloudinaryApiKey,
            api_secret: process.env.cloudinaryApiSecret,
        });
    }
    async uploadImage(
        file: string,
        coursename: string
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {

        return new Promise((resolve, reject) => {
            return v2.uploader.upload(file, { folder: 'courses', public_id: coursename }, (error, result) => {
                if (error) return reject(error)
                resolve(result)
            });
        });
    }
}