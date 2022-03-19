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

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Project])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProjectsMiddleware).forRoutes({
      path: '/projects/*+',
      method: RequestMethod.ALL,
    });
  }
}
