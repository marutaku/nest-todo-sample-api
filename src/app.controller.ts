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
import { Public } from './share/public.decorator';

@Controller()
export class AppController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
