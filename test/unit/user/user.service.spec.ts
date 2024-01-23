import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    it('해당하는 email이 존재하는 경우', async () => {
      const spy = jest.spyOn(service, 'findByEmail');
      const user = service.findByEmail('test@naver.com');

      expect(spy).toHaveBeenCalled();
      expect(user).toBeInstanceOf(User);
    });
  });
});
