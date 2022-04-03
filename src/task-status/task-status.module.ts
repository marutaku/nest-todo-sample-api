import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from '../boards/boards.module';
import { TaskStatus } from './task-status.entity';
import { TaskStatusService } from './task-status.service';
import { TaskStatusController } from './task-status.controller';
import { TaskStatusResolver } from './task-status.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus]), BoardsModule],
  providers: [TaskStatusService, TaskStatusResolver],
  controllers: [TaskStatusController],
  exports: [TaskStatusService],
})
export class TaskStatusModule {}
