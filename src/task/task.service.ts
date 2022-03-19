import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsService } from '../../src/boards/boards.service';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @Inject(BoardsService) private boardService: BoardsService,
  ) {}

  async getTasks(boardId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { board: { id: boardId } } });
  }

  async getTaskById(taskId: number, boardId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
        board: { id: boardId },
      },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(taskProperty: TaskDto, boardId: number): Promise<Task> {
    const { title, description, deadline } = taskProperty;
    const task = new Task();
    const board = await this.boardService.getBoardById(boardId);
    task.title = title;
    task.description = description;
    task.deadline = new Date(Date.parse(deadline));
    task.status = 'OPEN';
    task.board = board;

    try {
      await this.taskRepository.save(task);
    } catch (e) {
      throw new InternalServerErrorException();
    }
    // Boardの情報は
    delete task.board;
    return task;
  }

  async deleteTask(taskId: number, boardId: number): Promise<void> {
    const result = await this.taskRepository.delete({
      id: taskId,
      board: { id: boardId },
    });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTask(id: number, status: string, boardId: number): Promise<Task> {
    const task = await this.getTaskById(id, boardId);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
