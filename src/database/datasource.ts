import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();
console.log('migration 시작');
const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/entity/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../database/migrations/*.ts'],
  migrationsTableName: 'migrations',
};

export const dataSource = new DataSource(options);
