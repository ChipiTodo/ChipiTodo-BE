import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { SignupDto } from 'src/auth/dto/transfer.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findUserByEmail', () => {
    it('should return user if found', async () => {
      const email = 'test@example.com';
      const user = new User();
      user.email = email;
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await userService.findUserByEmail(email);

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toBeCalledWith({ where: { email } });
    });

    it('should return null if user not found', async () => {
      const email = 'test@example.com';
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await userService.findUserByEmail(email);

      expect(result).toBeNull();
      expect(mockUserRepository.findOne).toBeCalledWith({ where: { email } });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const signupDto: SignupDto = {
        email: 'test@example.com',
        password: 'password',
        nickname: 'testuser',
      };

      await userService.createUser(signupDto);

      expect(mockUserRepository.create).toBeCalledWith(signupDto);
      expect(mockUserRepository.save).toBeCalledTimes(1);
    });
  });
});
