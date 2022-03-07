import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createHash } from 'crypto';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByNameAndPassword(
    name: string,
    password: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({
      name,
      password: this.hashPassword(password),
    });
  }

  async createUser(userProperty: UserDto): Promise<User> {
    const existsUser = await this.userRepository.find({
      name: userProperty.name,
    });
    if (existsUser.length !== 0) {
      throw new BadRequestException('user already exists');
    }
    const user = new User();
    user.name = userProperty.name;
    user.password = this.hashPassword(userProperty.password);
    try {
      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  private hashPassword(password: string): string {
    const sha512 = createHash('sha512');
    sha512.update(password);
    return sha512.digest('hex');
  }
}
