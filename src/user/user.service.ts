import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from 'src/auth/dto/transfer.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * email을 통해 DB의 user를 찾습니다.
   * @param email 기본적인 email
   * @returns {User}
   */
  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  /**
   * 회원가입을 위한 Methods
   * @param SignupDto
   */
  async createUser({ email, password, nickname }: SignupDto): Promise<void> {
    const user = this.userRepository.create({ email, password, nickname });
    await this.userRepository.save(user);
  }
}
