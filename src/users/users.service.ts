import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByName(name: string, password: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      name,
      password: this.hashPassword(password),
    });
  }
  private hashPassword(password: string): string {
    const sha512 = createHash('sha512');
    sha512.update(password);
    return sha512.digest('hex');
  }
}
