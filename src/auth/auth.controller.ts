import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

import { AuthService } from './auth.service';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';

import { SignUpDto, ResetPasswordDto, PasswordResetDto } from './dto';

import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailConfirmationService: EmailConfirmationService,
    private emailService: EmailService,
  ) {}

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
    const user: User = await this.authService.signUp(signUpDto);
    this.emailConfirmationService.sendVerificationLink(user.email);
    return user;
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

  @Post('request-password-reset')
  async requestPasswordReset(@Body() passwordResetDto: PasswordResetDto) {
    return this.authService.requestPasswordReset(passwordResetDto.email);
  }

  @Post('reset-password/:token')
  async resetPasswordToken(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPasswordToken(
      token,
      resetPasswordDto.newPassword,
    );
  }
}
