import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createSpace(body: SpaceRequestDto): Promise<Object> {
    const { name, description } = body;

    const space = await this.spaceRepository.create({ name, description });

    await this.spaceRepository.save(space);

    return { statusCode: 201, message: '생성 완료!' };
  }

  async getAllSpace(): Promise<Space[]> | null {
    const spaces = await this.spaceRepository.find();

    return spaces;
  }

  async updateSpace(id: number, body: SpaceRequestDto): Promise<Object> | null {
    const { name, description } = body;

    const space = await this.spaceRepository.findOne({
      where: {
        id,
      },
    });

    if (!space) {
      throw new NotFoundException();
    }

    if (name) {
      space.name = name;
    }

    if (description) {
      space.description = description;
    }

    await this.spaceRepository.save(space);

    return { statusCode: 200, message: '수정 완료!' };
  }
}
