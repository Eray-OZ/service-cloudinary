import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const project = await this.prisma.project.findUnique({
      where: { apiKey },
    });

    if (!project) {
      throw new UnauthorizedException('Invalid API key');
    }

    // Attach project info to request for later use in logs
    request.project = project;
    return true;
  }
}
