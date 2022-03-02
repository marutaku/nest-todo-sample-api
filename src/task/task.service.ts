import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    const task = await this.taskRepository.findOne(taskId);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(taskProperty: TaskDto): Promise<Task> {
    const { title, description, deadline } = taskProperty;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.deadline = deadline;
    task.status = 'OPEN';
    try {
      await this.taskRepository.save(task);
    } catch (e) {
      throw new InternalServerErrorException();
    }
    return task;
  }

  async deleteTask(taskId: number): Promise<void> {
    const result = await this.taskRepository.delete(taskId);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTask(id: number, status: string): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
