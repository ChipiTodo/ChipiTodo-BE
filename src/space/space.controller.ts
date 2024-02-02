import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
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

  @Get()
  async getAllSpace(): Promise<Space[]> | null {
    return await this.spaceService.getAllSpace();
  }

  @Put(':id')
  async updateSpace(
    @Param('id', ParseIntPipe) id: number,
    @Body() spaceRequestDto: SpaceRequestDto,
  ): Promise<Object> {
    return this.spaceService.updateSpace(id, spaceRequestDto);
  }
}
