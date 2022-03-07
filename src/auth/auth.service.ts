import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByNameAndPassword(
      username,
      password,
    );
    if (user) {
      delete user.password;
      return user;
    }
    return null;
  }
}
