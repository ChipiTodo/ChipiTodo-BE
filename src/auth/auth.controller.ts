import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/login')
  async login() {}

  @Post('/signup')
  async signup() {}
}
