import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Project } from './project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsMiddleware } from './projects.middleware';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Project])],
  providers: [ProjectsService, ProjectsResolver],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProjectsMiddleware)
      .exclude({
        path: 'projects',
        method: RequestMethod.POST,
      })
      .forRoutes(ProjectsController);
  }
}
