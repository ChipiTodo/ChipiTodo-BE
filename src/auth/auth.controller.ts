import { AuthService } from './auth.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignupReqDto } from './dto/req.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login() {}

  @Post('/signup')
  async signup(@Body() signupReqDto: SignupReqDto) {
    const { email, password, nickname } = signupReqDto;
    if (signupReqDto.password !== signupReqDto.confirmPassword)
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    return await this.authService.signup({ email, password, nickname });
  }
}
