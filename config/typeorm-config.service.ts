import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const configService = new ConfigService();
    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOSTNAME'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: false,
      logging: true,
    };
  }
}
