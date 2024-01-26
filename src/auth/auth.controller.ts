import { AuthService } from './auth.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SignupReqDto } from './dto/req.dto';
import { SuccessResDto } from 'src/common/dto/res.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login() {}

  @Post('/signup')
  async signup(@Body() signupReqDto: SignupReqDto): Promise<SuccessResDto> {
    const { email, password, nickname } = signupReqDto;
    if (signupReqDto.password !== signupReqDto.confirmPassword)
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    await this.authService.signup({ email, password, nickname });
    return { success: true };
  }
}
