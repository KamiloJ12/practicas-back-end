import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import {
  SignUpDto,
  ResetPasswordDto,
  PasswordResetDto,
  ResetPasswordTokenDto,
} from './dto';

import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Req() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('check-token')
  checkToken(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('reset-password')
  async resetPassword(@Req() req, @Body() resetPasswordDto: ResetPasswordDto) {
    const { id } = req.user;
    return this.authService.resetPassword(id, resetPasswordDto.newPassword);
  }

  @Public()
  @Post('request-password-reset')
  async requestPasswordReset(@Body() passwordResetDto: PasswordResetDto) {
    return this.authService.requestPasswordReset(passwordResetDto.email);
  }

  @Public()
  @Post('reset-password-token')
  async resetPasswordToken(
    @Body() resetPasswordTokenDto: ResetPasswordTokenDto,
  ) {
    return this.authService.resetPasswordToken(
      resetPasswordTokenDto.token,
      resetPasswordTokenDto.newPassword,
    );
  }
}
