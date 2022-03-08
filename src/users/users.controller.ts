import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  @Get(':id')
  async findUserById(@Param('id', ParseIntPipe) userId: number) {
    return this.usersService.findUserById(userId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(userProperty: UserDto) {
    return this.usersService.createUser(userProperty);
  }
}
