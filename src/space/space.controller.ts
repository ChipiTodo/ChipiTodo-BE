import { Body, Controller, Post } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceRequestDto } from './dto/space-request.dto';
import { Space } from './entity/space.entity';

@Controller('space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  async createSpace(@Body() spaceRequestDto: SpaceRequestDto): Promise<Space> {
    return this.spaceService.createSpace(spaceRequestDto);
  }
}
