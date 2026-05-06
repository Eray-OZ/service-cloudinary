import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation, ApiSecurity } from '@nestjs/swagger';

@ApiTags('Upload')
@ApiSecurity('x-api-key')
@Controller('v1/upload')
@UseGuards(ApiKeyGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a single image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        folder: { type: 'string', example: 'avatars' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder: string,
    @Req() req: any,
  ) {
    return this.uploadService.processUpload(file, folder, req.project.id);
  }

  @Post('multiple')
  @ApiOperation({ summary: 'Upload multiple images at once' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
        folder: { type: 'string', example: 'gallery' },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('folder') folder: string,
    @Req() req: any,
  ) {
    const results = await Promise.all(
      files.map((file) =>
        this.uploadService.processUpload(file, folder, req.project.id),
      ),
    );
    return { success: true, data: results };
  }

  @Post('base64')
  @ApiOperation({ summary: 'Upload an image from a base64 string' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', example: 'data:image/png;base64,...' },
        folder: { type: 'string', example: 'mobile-app' },
      },
    },
  })
  async uploadBase64(
    @Body('image') base64String: string,
    @Body('folder') folder: string,
    @Req() req: any,
  ) {
    return this.uploadService.processBase64Upload(
      base64String,
      folder,
      req.project.id,
    );
  }
}
