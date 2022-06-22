import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { LoginPayloadDto } from './dto/loginPayload.dto';

@Controller('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() loginDto: LoginDto): Promise<LoginPayloadDto> {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Post('email-send')
  async sendEmail(@Body() params: any) {
    console.log(params);
  }

  @Post('email-verify')
  async verifyEmail(@Body() params: any) {
    console.log(params);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@AuthUser() user: User): Promise<User> {
    return this.authService.getProfile(user);
  }
  //gen otp
  //set otp
  //is otp
  //otp login
}
