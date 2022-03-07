import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { generateMockRepository } from '../share/test-support';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: generateMockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('findOne', () => {
    it('find user by username', async () => {
      const mockUserName = 'test';
      const mockUser = {
        name: mockUserName,
        password: 'testpass',
      };
      userRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.findByName(mockUserName);
      expect(result).toEqual(mockUser);
    });
  });
});
