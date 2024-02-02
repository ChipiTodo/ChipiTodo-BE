import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entity/space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Space])],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}
