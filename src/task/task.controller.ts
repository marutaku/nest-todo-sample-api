import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  UsePipes,
  ValidationPipe,
  Inject,
  Put,
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskStatusPipe } from './task.pipe';
import { TasksService } from './task.service';

@Controller('/boards/:boardId/tasks')
export class TaskController {
  constructor(@Inject(TasksService) private tasksService: TasksService) {}
  @Get()
  getTasks(@Param('boardId', ParseIntPipe) boardId: number) {
    return this.tasksService.getTasks(boardId);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Param('boardId', ParseIntPipe) boardId: number,
  ) {
    return this.tasksService.getTaskById(id, boardId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() taskDto: TaskDto,
    @Param('boardId', ParseIntPipe) boardId: number,
  ) {
    return this.tasksService.createTask(taskDto, boardId);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Param('boardId', ParseIntPipe) boardId: number,
  ) {
    return this.tasksService.deleteTask(id, boardId);
  }

  @Put('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: string,
    @Param('boardId', ParseIntPipe) boardId: number,
  ) {
    return this.tasksService.updateTask(id, status, boardId);
  }
}
