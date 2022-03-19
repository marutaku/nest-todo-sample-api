import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

const mockUser = { name: 'test', password: 'testpass' };

const mockUsersService = { findByNameAndPassword: jest.fn() };

describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: { sign: jest.fn() } },
      ],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return mockUsersService;
        }
      })
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('validate user succeeded', async () => {
      mockUsersService.findByNameAndPassword.mockResolvedValue(mockUser);
      const result = await service.validateUser(
        mockUser.name,
        mockUser.password,
      );
      expect(result.name).toEqual(mockUser.name);
      expect(result).not.toHaveProperty('password');
    });
    it('user not found', async () => {
      mockUsersService.findByNameAndPassword.mockResolvedValue(undefined);
      const result = await service.validateUser(
        mockUser.name,
        mockUser.password,
      );
      expect(result).toBeNull();
    });
  });
});
