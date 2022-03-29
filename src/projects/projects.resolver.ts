import { Inject, Query } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  constructor(
    @Inject(ProjectsService) private projectsService: ProjectsService,
  ) {}

  @Query((returns) => [Project])
  async projects(){
    return this.projectsService.
  }
}
