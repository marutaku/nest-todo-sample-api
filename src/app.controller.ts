import { AuthService } from './auth/auth.service';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Inject,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
