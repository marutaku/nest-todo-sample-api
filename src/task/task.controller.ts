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
  UseGuards,
} from '@nestjs/common';
import { BoardsGuard } from '../boards/boards.guard';
import { ProjectGuard } from '../share/project.guard';
import { TaskDto } from './task.dto';
import { TasksService } from './task.service';

@Controller('/projects/:projectId/boards/:boardId/tasks')
@UseGuards(ProjectGuard, BoardsGuard)
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

  @Put('/:id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('statusId') statusId: number,
    @Param('boardId', ParseIntPipe) boardId: number,
  ) {
    return this.tasksService.updateTaskStatus(id, statusId, boardId);
  }

  @Put('/:id/')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() taskProperty: Partial<TaskDto>,
  ) {
    return this.tasksService.updateTask(id, boardId, taskProperty);
  }
}
