import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from '../boards/boards.module';
import { TaskStatus } from './task-status.entity';
import { TaskStatusService } from './task-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus]), BoardsModule],
  providers: [TaskStatusService],
})
export class TaskStatusModule {}
