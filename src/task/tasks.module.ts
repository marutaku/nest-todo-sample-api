import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import { BoardsService } from 'src/boards/boards.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TasksService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Board])],
  controllers: [TaskController],
  providers: [TasksService, BoardsService],
})
export class TasksModule {}
