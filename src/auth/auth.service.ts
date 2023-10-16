import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Role } from './enums/role.enum';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailConfirmationService: EmailConfirmationService,
    private emailService: EmailService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const role = signUpDto.email.endsWith('@ufps.edu.co')
        ? Role.Student
        : Role.Company;
      const user = await this.usersService.create({
        ...signUpDto,
        role,
      });
      this.emailConfirmationService.sendVerificationLink(signUpDto.email);
      return this.login(user);
    } catch (error) {
      if (error?.code === '23505') {
        throw new BadRequestException('User with that email already exists');
      }
      throw new InternalServerErrorException('Please check server logs');
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      const isMatch = await bcrypt.compare(password, user.password);

      if (user && isMatch) {
        return user;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async login(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('user with this email not found');
    }

    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);
    const url = `${this.configService.get('RESET_PASSWORD_URL')}/${token}`;

    return this.emailService.sendEmailResetPassword(
      user.email,
      url,
      '10 minutos',
    );
  }

  async resetPassword(id: number, newPassword: string) {
    const hashedPassword: string = await bcrypt.hash(newPassword, 10);
    return this.usersService.update(id, { password: hashedPassword });
  }

  async resetPasswordToken(token: string, newPassword: string) {
    try {
      console.log(token, newPassword);
      const payload = await this.jwtService.verify(token);
      if (typeof payload === 'object' && 'email' in payload) {
        this.resetPassword(payload.id, newPassword);
      } else {
        throw new BadRequestException();
      }
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      console.log(error);
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
