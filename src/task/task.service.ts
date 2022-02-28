import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(taskId: number): Promise<Task> {
    const task = this.taskRepository.findOne(taskId);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(taskProperty: TaskDto): Promise<Task> {
    const { title, description, deadline } = taskProperty;
  }
}
