import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { useMockRepositoryProvider } from '../share/test-support';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { randomUUID } from 'crypto';

const generateMockUser = (userProps = {}) =>
  Object.assign({ name: 'test', password: 'password' }, userProps);

describe('UsersService', () => {
  let service: UsersService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, useMockRepositoryProvider(User)],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('findUserByNameAndPassword', () => {
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

  describe('findUserById', () => {
    it('find user by id', async () => {
      const mockUserId = randomUUID();
      const mockUser = generateMockUser();
      userRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.findUserById(mockUserId);
      expect(userRepository.findOne).toBeCalledWith(mockUserId);
      expect(result).toEqual(mockUser);
    });

    it('user not found', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      expect(service.findUserById(randomUUID())).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('create user', async () => {
      const mockUser = generateMockUser();
      userRepository.save.mockResolvedValue(null);
      userRepository.find.mockResolvedValue([]);
      const result = await service.createUser(mockUser);
      expect(result.name).toEqual(mockUser.name);
    });

    it('raise exception if user already exists', async () => {
      const mockUser = generateMockUser();
      userRepository.save.mockResolvedValue(null);
      userRepository.find.mockResolvedValue([mockUser]);
      expect(service.createUser(mockUser)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
