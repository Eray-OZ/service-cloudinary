import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
})
export class UploadModule {}
