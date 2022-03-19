import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RequestWithJwtInfo } from '../share/request';
import { ProjectDto } from './project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject(ProjectsService) private projectService: ProjectsService,
  ) {}

  @Get(':projectId')
  fetchProjectById(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.projectService.findProjectById(projectId);
  }

  @Get(':projectId/users')
  fetchUserInProject(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.projectService.fetchUsersInProject(projectId);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  createNewProject(
    @Req() req: RequestWithJwtInfo,
    @Body() projectProps: ProjectDto,
  ) {
    return this.projectService.createProject(projectProps, req.user.id);
  }

  @Put(':projectId')
  updateProject(
    @Body() projectProps: Partial<ProjectDto>,
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ) {
    return this.projectService.updateProject(projectId, projectProps);
  }

  @Post(':projectId/join')
  joinProject(
    @Req() req: RequestWithJwtInfo,
    @Param('projectId', ParseUUIDPipe) projectId: string,
  ) {
    return this.projectService.addUserInProject(projectId, req.user.id);
  }
}
