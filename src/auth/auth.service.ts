import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/transfer.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  async validate() {}

  async signup({ email, password, nickname }: SignupDto) {
    // 1. 동일한 email이 있는지 확인한다.
    const user = await this.userService.findUserByEmail(email);
    if (user) throw new BadRequestException('user가 이미 존재합니다.');

    const saltRound = Number(this.configService.get('HASH_NUMBER'));
    const hashPassword = await bcrypt.hash(password, saltRound);

    await this.userService.createUser({
      email,
      password: hashPassword,
      nickname,
    });
  }
}
