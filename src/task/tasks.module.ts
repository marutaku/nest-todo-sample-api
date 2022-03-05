import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from 'src/boards/boards.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TasksService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), BoardsService],
  controllers: [TaskController],
  providers: [TasksService],
})
export class TasksModule {}
