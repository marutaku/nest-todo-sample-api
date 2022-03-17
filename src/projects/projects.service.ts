import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ProjectDto } from './project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @Inject(UsersService) private userService: UsersService,
  ) {}

  /**
   * プロジェクトに参加しているユーザを返す
   */
  async fetchUsersInProject(projectId: string, userId: string) {
    return (await this.findProjectById(projectId, userId)).users;
  }

  async createProject(projectProps: ProjectDto, userId: string) {
    const user = await this.userService.findUserById(userId);
    const project = new Project();
    project.name = projectProps.name;
    project.description = projectProps.description;
    project.users = [user];
    const { id: projectId } = await this.projectRepository.save(project);
    project.id = projectId;
    return project;
  }

  async updateProject(
    projectId: string,
    projectProps: Partial<ProjectDto>,
    userId: string,
  ) {
    const project = await this.findProjectById(projectId, userId);
    project.name = projectProps.name || project.name;
    project.description = projectProps.description || project.description;
    await this.projectRepository.save(project);
    return project;
  }

  async addUserInProject(projectId: string, userId: string) {
    const user = await this.userService.findUserById(userId);
    const project = await this.findProjectById(projectId, userId);
    console.log(project.users);
    if (project.users.some((user) => user.id === userId)) {
      throw new BadRequestException('User already join the project');
    }
    project.users.push(user);
    await this.projectRepository.save(project);
    return project;
  }

  async findProjectById(projectId: string, userId: string) {
    const project = await this.projectRepository.findOne(projectId, {
      relations: ['users'],
    });

    if (!project) {
      throw new NotFoundException('project not found');
    } else if (!project.users.some((user) => user.id === userId)) {
      throw new UnauthorizedException('Unauthorize');
    }
    return project;
  }
}
