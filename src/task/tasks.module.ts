import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/board.entity';
import { BoardsModule } from '../boards/boards.module';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TasksService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Board]), BoardsModule],
  controllers: [TaskController],
  providers: [TasksService],
})
export class TasksModule {}
