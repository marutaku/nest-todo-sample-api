import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsService } from '../boards/boards.service';
import { CreateTaskStatusDto, UpdateTaskStatusDto } from './task-status.dto';
import { TaskStatus } from './task-status.entity';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectRepository(TaskStatus)
    private taskStatusRepository: Repository<TaskStatus>,
    @Inject(BoardsService) private boardService: BoardsService,
  ) {}

  async findTaskStatusById(taskStatusId: number, relations: string[] = []) {
    return this.taskStatusRepository.findOne({
      where: {
        id: taskStatusId,
      },
      relations,
    });
  }

  async findTaskStatusByboardId(boardId: number, relations: string[] = []) {
    return this.taskStatusRepository.find({
      where: {
        board: {
          id: boardId,
        },
      },
      relations,
    });
  }

  async createTastStatus(boardId: number, statusProperty: CreateTaskStatusDto) {
    const board = await this.boardService.getBoardById(boardId);
    const statusNum = await this.taskStatusRepository.count({
      where: {
        board: {
          id: boardId,
        },
      },
    });
    const taskStatus = new TaskStatus();
    taskStatus.name = statusProperty.name;
    taskStatus.order = statusNum + 1;
    taskStatus.board = board;
    await this.taskStatusRepository.save(taskStatus);
    return taskStatus;
  }

  async updateTaskOrder(boardId: number, statusId: number, order: number) {
    if (order <= 0) {
      throw new BadRequestException('Invalid order');
    }
    const targetStatus = await this.findTaskStatusByBoardIdAndStatusId(
      boardId,
      statusId,
    );
    const statusInBoard = await this.findTaskStatusByboardId(boardId);
    if (order > statusInBoard.length) {
      throw new BadRequestException(
        'The specified order exceeds the number of statuses',
      );
    }
    const statusInBoardSorted = statusInBoard
      .filter((s) => s.id !== statusId)
      .sort((a, b) => a.order - b.order);
    statusInBoardSorted.splice(order, 0, targetStatus);
    return (
      await Promise.all(
        statusInBoardSorted.map(async (status, index) => {
          status.order = index + 1;
          await this.taskStatusRepository.save(status);
          return status;
        }),
      )
    ).sort((a, b) => a.order - b.order);
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

  async updateStatus(
    boardId: number,
    statusId: number,
    statusProperty: UpdateTaskStatusDto,
  ) {
    const status = await this.findTaskStatusByBoardIdAndStatusId(
      boardId,
      statusId,
    );
    const newStatus: TaskStatus = Object.assign(status, statusProperty);
    await this.taskStatusRepository.save(newStatus);
    return newStatus;
  }

  async deleteStatus(boardId: number, statusId: number) {
    const result = await this.taskStatusRepository.delete({
      id: statusId,
      board: {
        id: boardId,
      },
    });
    if (result.affected === 0) {
      throw new NotFoundException('Status not found');
    }
  }
}
