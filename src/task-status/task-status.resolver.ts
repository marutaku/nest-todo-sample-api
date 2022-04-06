import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from '../task/task.entity';
import { TaskStatus } from './task-status.entity';
import { TaskStatusService } from './task-status.service';

@Resolver(() => TaskStatus)
export class TaskStatusResolver {
  constructor(
    @Inject(TaskStatusService) private taskStatusService: TaskStatusService,
  ) {}
  @ResolveField('tasks', () => [Task])
  async fetchTasks(@Parent() taskStatus: TaskStatus) {
    return (
      await this.taskStatusService.findTaskStatusById(taskStatus.id, ['tasks'])
    ).tasks;
  }
}
