import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
// import { Todo } from './task/task.entity';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({ entities: [Todo] })
  // ],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule { }
