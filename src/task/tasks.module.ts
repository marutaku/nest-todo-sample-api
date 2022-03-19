import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/board.entity';
import { BoardsMiddleware } from '../boards/boards.middleware';
import { BoardsModule } from '../boards/boards.module';
import { ProjectsMiddleware } from '../projects/projects.middleware';
import { ProjectsModule } from '../projects/projects.module';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TasksService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Board]),
    BoardsModule,
    ProjectsModule,
  ],
  controllers: [TaskController],
  providers: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProjectsMiddleware, BoardsMiddleware)
      .forRoutes(TaskController);
  }
}
