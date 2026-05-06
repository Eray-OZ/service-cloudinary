import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../prisma.service';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(
    private cloudinary: CloudinaryService,
    private prisma: PrismaService,
  ) {}

  /**
   * Orchestrates the upload of a multipart file
   */
  async processUpload(
    file: Express.Multer.File,
    folder: string,
    projectId: string,
  ) {
    const result = await this.cloudinary.uploadFile(file, folder);
    return this.saveLog(result as UploadApiResponse, projectId);
  }

  /**
   * Orchestrates the upload of a base64 string
   */
  async processBase64Upload(
    base64String: string,
    folder: string,
    projectId: string,
  ) {
    const result = await this.cloudinary.uploadBase64(base64String, folder);
    return this.saveLog(result as UploadApiResponse, projectId);
  }

  /**
   * Saves the upload transaction to the local SQLite database
   */
  private async saveLog(result: UploadApiResponse, projectId: string) {
    const optimizedUrl = this.cloudinary.getOptimizedUrl(result.public_id);

    const log = await this.prisma.uploadLog.create({
      data: {
        projectId,
        url: optimizedUrl,
        publicId: result.public_id,
        size: result.bytes,
        format: result.format,
      },
    });

    return {
      success: true,
      data: {
        id: log.id,
        url: optimizedUrl,
        originalUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        dimensions: {
          width: result.width,
          height: result.height,
        },
      },
    };
  }
}
