import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

const mockUser = { name: 'test', password: 'testpass' };

const mockUserService = {
  findByName: jest.fn().mockResolvedValue(mockUser),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return mockUserService;
        }
      })
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('validate user succeeded', async () => {
      const result = await service.validateUser(
        mockUser.name,
        mockUser.password,
      );
      expect(result.name).toEqual(mockUser.name);
      expect(result).not.toHaveProperty('password');
    });
    it('validate user failed', async () => {
      const result = await service.validateUser(mockUser.name, '');
      expect(result).toBeNull();
    });
  });
});
