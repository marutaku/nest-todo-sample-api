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
  async fetchBoards(@Parent() project: Project) {
    return (
      // TODO: ここ直す
      (await this.projectsService.findProjectById(project.id)).boards || []
    );
  }
}
