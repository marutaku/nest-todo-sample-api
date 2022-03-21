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
import { TaskStatusService } from '../task-status/task-status.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @Inject(BoardsService) private boardService: BoardsService,
    @Inject(TaskStatusService) private taskStatusService: TaskStatusService,
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
    const initialStatus = (
      await this.taskStatusService.findTaskByboardId(boardId)
    ).sort((a, b) => a.order - b.order)[0];
    task.title = title;
    task.description = description;
    task.deadline = new Date(Date.parse(deadline));
    task.status = initialStatus;
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

  async updateTaskStatus(
    id: number,
    statusId: number,
    boardId: number,
  ): Promise<Task> {
    const task = await this.getTaskById(id, boardId);
    task.status =
      await this.taskStatusService.findTaskStatusByBoardIdAndStatusId(
        boardId,
        statusId,
      );
    await this.taskRepository.save(task);
    return task;
  }

  async updateTask(
    id: number,
    boardId: number,
    taskProperty: Partial<TaskDto>,
  ) {
    const task = await this.getTaskById(id, boardId);
    task.title = taskProperty.title || task.title;
    task.description = taskProperty.description || task.description;
    task.deadline = taskProperty.deadline
      ? new Date(Date.parse(taskProperty.deadline))
      : task.deadline;
    await this.taskRepository.save(task);
    return task;
  }
}
