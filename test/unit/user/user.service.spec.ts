import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';

describe('User Service 단위 테스트', () => {
  console.log(__dirname);

  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('UserService 불러오기 test', () => {
    expect(userService).toBeDefined();
  });
});
