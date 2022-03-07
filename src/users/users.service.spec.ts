import { BadRequestException } from '@nestjs/common';
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
      const mockUser = {
        name: 'test',
        password: 'testpass',
      };
      userRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.findByNameAndPassword(
        mockUser.name,
        mockUser.password,
      );
      expect(result).toEqual(mockUser);
    });
  });
  describe('createUser', () => {
    it('create user', async () => {
      const mockUser = {
        name: 'test',
        password: 'password',
      };
      userRepository.save.mockResolvedValue(null);
      userRepository.find.mockResolvedValue([]);
      const result = await service.createUser(mockUser);
      expect(result.name).toEqual(mockUser.name);
      expect(result).not.toHaveProperty('password');
    });

    it('raise exception if user already exists', async () => {
      const mockUser = {
        name: 'test',
        password: 'password',
      };
      userRepository.save.mockResolvedValue(null);
      userRepository.find.mockResolvedValue([mockUser]);
      expect(service.createUser(mockUser)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
