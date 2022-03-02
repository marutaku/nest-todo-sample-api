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
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskStatusPipe } from './task.pipe';
import { TasksService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(@Inject(TasksService) private tasksService: TasksService) {}
  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() taskDto: TaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Post('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: string,
  ) {
    return this.tasksService.updateTask(id, status);
  }
}
