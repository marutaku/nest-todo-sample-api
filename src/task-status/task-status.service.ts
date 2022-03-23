import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsService } from '../boards/boards.service';
import { TaskStatusDto } from './task-status.dto';
import { TaskStatus } from './task-status.entity';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectRepository(TaskStatus)
    private taskStatusRepository: Repository<TaskStatus>,
    @Inject(BoardsService) private boardService: BoardsService,
  ) {}

  async findTaskByboardId(boardId: number) {
    return this.taskStatusRepository.find({
      where: {
        board: {
          id: boardId,
        },
      },
    });
  }

  async createTastStatus(boardId: number, statusProperty: TaskStatusDto) {
    const board = await this.boardService.getBoardById(boardId);
    const taskStatus = new TaskStatus();
    taskStatus.name = statusProperty.name;
    taskStatus.order = statusProperty.order;
    taskStatus.board = board;
    await this.taskStatusRepository.save(taskStatus);
    return taskStatus;
  }

  async findTaskStatusByBoardIdAndStatusId(boardId: number, statusId: number) {
    const status = await this.taskStatusRepository.findOne({
      where: {
        id: statusId,
        board: {
          id: boardId,
        },
      },
    });
    if (!status) {
      throw new NotFoundException('task status not found');
    }
    return status;
  }
}
