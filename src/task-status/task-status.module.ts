import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.entity';
import { TaskStatusService } from './task-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus])],
  providers: [TaskStatusService],
})
export class TaskStatusModule {}
