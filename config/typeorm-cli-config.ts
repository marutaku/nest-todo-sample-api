import { DataSourceOptions } from 'typeorm';
import { config as loadConfig } from 'dotenv';

loadConfig({ path: '.env/default.env', debug: true });

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOSTNAME,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC !== 'false' || true,
  logging: false,
  entities: ['./src/**/*.entity.{js,ts}'],
  migrations: ['migrations/**/*.ts'],
};

export default ormconfig;
