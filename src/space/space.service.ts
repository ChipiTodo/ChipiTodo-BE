import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from './entity/space.entity';
import { Repository } from 'typeorm';
import { SpaceRequestDto } from './dto/space-request.dto';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private readonly spaceRepository: Repository<Space>,
  ) {}

  async createSpace(body: SpaceRequestDto): Promise<Space> {
    const { name, description } = body;

    const space = await this.spaceRepository.create({ name, description });

    await this.spaceRepository.save(space);

    return space;
  }

  async getAllSpace(): Promise<Space[]> | null {
    const spaces = await this.spaceRepository.find();

    return spaces;
  }
}
