import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatus } from './task-status.entity';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectRepository(TaskStatus)
    private taskStatusRepository: Repository<TaskStatus>,
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

  async findTaskStatusByBoardIdAndStatusId(boardId: number, statusId: number) {
    return this.taskStatusRepository.findOne({
      where: {
        id: statusId,
        board: {
          id: boardId,
        },
      },
    });
  }
}
