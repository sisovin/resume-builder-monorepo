import { Controller, Post, Body, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RateLimit } from 'nestjs-rate-limiter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @RateLimit({ points: 5, duration: 60 })
  async login(@Request() req, @Res() res) {
    const token = await this.authService.login(req.user);
    res.cookie('jwt', token.access_token, { httpOnly: true });
    return res.status(HttpStatus.OK).json(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() res) {
    res.clearCookie('jwt');
    return res.status(HttpStatus.OK).json({ message: 'Logged out' });
  }

  @Post('register')
  @RateLimit({ points: 5, duration: 60 })
  async register(@Body() createUserDto, @Res() res) {
    const hashedPassword = await this.authService.hashPassword(createUserDto.password);
    const user = await this.authService.createUser({ ...createUserDto, password: hashedPassword });
    return res.status(HttpStatus.CREATED).json(user);
  }
}
