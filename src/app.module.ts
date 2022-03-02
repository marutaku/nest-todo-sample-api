import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './task/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from 'config/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env/${process.env.NODE_ENV}.env`, '.env/default.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      // TypeOrmConfigServiceで必要な依存関係?を追加
      imports: [ConfigModule],
      // サービスクラスを指定する
      useClass: TypeOrmConfigService,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
