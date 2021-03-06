import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from '../share/public.decorator';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Get(':id')
  async findUserById(@Param('id', ParseUUIDPipe) userId: string) {
    const user = await this.usersService.findUserById(userId);
    return this.sanitizeUser(user);
  }

  @Public()
  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() userProperty: UserDto) {
    const user = await this.usersService.createUser(userProperty);
    return this.sanitizeUser(user);
  }

  private sanitizeUser(user: User): User {
    delete user.password;
    return user;
  }
}
