import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    // Configure Cloudinary with environment variables
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
      secure: true,
    });
  }

  /**
   * Uploads a file buffer to Cloudinary using streams
   */
  async uploadFile(
    file: Express.Multer.File,
    folder: string = 'general',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { 
          folder,
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Cloudinary upload failed'));
          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }

  /**
   * Uploads a base64 string to Cloudinary
   */
  async uploadBase64(
    base64String: string,
    folder: string = 'general',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        base64String,
        {
          folder,
        },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Cloudinary base64 upload failed'));
          resolve(result);
        },
      );
    });
  }

  /**
   * Generates an optimized URL using Cloudinary's auto format and quality
   */
  getOptimizedUrl(publicId: string): string {
    return cloudinary.url(publicId, {
      quality: 'auto',
      fetch_format: 'auto',
      secure: true,
    });
  }
}
