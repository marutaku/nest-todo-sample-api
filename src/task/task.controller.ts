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
} from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskStatusPipe } from './task.pipe';

@Controller('tasks')
export class TaskController {
  @Get()
  getTasks() {
    return 'getTasks Success!';
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return `getTaskById Success! Parameter [id:${id}]`;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() taskDto: TaskDto) {
    const { title, description } = taskDto;
    return `createTask Success! Prameter [title:${title}, descritpion:${description}]`;
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return `deleteTask Success! Prameter [id:${id}]`;
  }

  @Post('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: string,
  ) {
    return `updateTask Success! Prameter [id:${id}, status:${status}]`;
  }
}
