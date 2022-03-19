import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ProjectsService } from './projects.service';

@Injectable()
export class ProjectsMiddleware implements NestMiddleware {
  constructor(
    @Inject(ProjectsService) private projectsService: ProjectsService,
  ) {}
  async use(req: any, res: Response, next: NextFunction) {
    const { projectId } = req.params;
    const project = await this.projectsService.findProjectById(projectId);
    req.project = project;
    next();
  }
}
