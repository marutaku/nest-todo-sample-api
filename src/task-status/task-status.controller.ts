import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskStatusDto, UpdateTaskStatusDto } from './task-status.dto';
import { TaskStatusService } from './task-status.service';

@Controller('/projects/:projectId/boards/:boardId/task-status')
export class TaskStatusController {
  constructor(
    @Inject(TaskStatusService) private taskStatusService: TaskStatusService,
  ) {}

  @Get('')
  async fetchAllStatusInBoard(@Param('boardId', ParseIntPipe) boardId: number) {
    return this.taskStatusService.findTaskStatusByboardId(boardId);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  async createNewStatus(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() statusProperty: CreateTaskStatusDto,
  ) {
    return this.taskStatusService.createTastStatus(boardId, statusProperty);
  }

  @Put(':statusId')
  @UsePipes(ValidationPipe)
  async updateStatus(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('statusId', ParseIntPipe) statusId: number,
    @Body() statusProperty: UpdateTaskStatusDto,
  ) {
    return this.taskStatusService.updateStatus(
      boardId,
      statusId,
      statusProperty,
    );
  }

  @Delete(':statusId')
  async deleteStatus(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Param('statusId', ParseIntPipe) statusId: number,
  ) {
    return this.taskStatusService.deleteStatus(boardId, statusId);
  }
}
