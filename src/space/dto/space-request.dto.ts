import { PickType } from '@nestjs/mapped-types';
import { Space } from '../entity/space.entity';

export class SpaceRequestDto extends PickType(Space, ['name', 'description']) {}
