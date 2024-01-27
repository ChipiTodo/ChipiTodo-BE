import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/transfer.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.validate(email, password);
    const accessToken = 
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('해당하는 유저가 없습니다.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('이메일 혹은 비밀번호를 확인하세요.');

    return user;
  }

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
