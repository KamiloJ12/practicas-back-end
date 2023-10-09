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
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailConfirmationService: EmailConfirmationService,
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
    await this.emailConfirmationService.sendVerificationLink(user.email);
    return user;
  }

  @Get('check-token')
  checkToken(@Req() req) {
    return this.authService.login(req.user);
  }

  @Roles(Role.Company)
  @Get('company')
  getProfile(@Req() req) {
    return req.user;
  }

  @Roles(Role.Student)
  @Get('estudent')
  getProfileEs(@Req() req) {
    return req.user;
  }
}
