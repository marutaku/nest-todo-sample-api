import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsMiddleware } from '../projects/projects.middleware';
import { ProjectsModule } from '../projects/projects.module';
import { UsersModule } from '../users/users.module';
import { Board } from './board.entity';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), ProjectsModule, UsersModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsResolver],
  exports: [BoardsService],
})
export class BoardsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProjectsMiddleware).forRoutes(BoardsController);
  }
}
