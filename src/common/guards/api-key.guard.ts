import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing in headers');
    }

    const project = await this.prisma.project.findUnique({
      where: { apiKey },
    });

    if (!project) {
      throw new UnauthorizedException('Invalid API key provided');
    }

    // Attach project metadata to the request object for logging
    request.project = project;
    return true;
  }
}
