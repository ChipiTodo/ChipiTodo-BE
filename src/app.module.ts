import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entity/user.entity';
import { Space } from './space/entity/space.entity';
import { SpaceAuth } from './spaceauth/entity/spaceauth.entity';
import { Issue } from './issue/entity/issue.entity';
import { Comment } from './comment/entity/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('postgres.host'),
          port: configService.get('postgres.port'),
          database: configService.get('postgres.database'),
          username: configService.get('postgres.username'),
          password: configService.get('postgres.password'),
          entities: [User, Space, SpaceAuth, Issue, Comment],
          synchronize: false,
          logging: false,
        };
      },
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
