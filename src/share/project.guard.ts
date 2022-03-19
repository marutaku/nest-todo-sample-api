import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Project } from '../projects/project.entity';

export class ProjectGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const project: Project = request.project;
    const userId = request.user.id;
    if (project.users.some((u) => u.id === userId)) {
      return true;
    } else {
      throw new UnauthorizedException('Access denied');
    }
  }
}
