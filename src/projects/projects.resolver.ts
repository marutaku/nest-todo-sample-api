import { Inject } from '@nestjs/common';
import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Board } from '../boards/board.entity';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    @Inject(ProjectsService) private projectsService: ProjectsService,
  ) {}

  @Query(() => Project)
  async findProjectById(
    @Args('projectId', { type: () => String }) projectId: string,
  ) {
    return this.projectsService.findProjectById(projectId);
  }

  @ResolveField('boards', () => [Board], {
    nullable: true,
    defaultValue: Array,
  })
  async fetchBoards(@Parent() projectArg: Project) {
    const project = await this.projectsService.findProjectById(projectArg.id, [
      'users',
      'boards',
    ]);
    return project.boards || [];
  }
}
