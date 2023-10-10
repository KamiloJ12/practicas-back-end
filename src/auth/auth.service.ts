import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const hashedPassword: string = await bcrypt.hash(signUpDto.password, 10);
      const role = signUpDto.email.endsWith('@ufps.edu.co')
        ? Role.Student
        : Role.Company;

      const createdUser = await this.usersService.create({
        ...signUpDto,
        role,
        password: hashedPassword,
      });

      return createdUser;
    } catch (error) {
      if (error?.code === '23505') {
        throw new BadRequestException('User with that email already exists');
      }
      throw new InternalServerErrorException('Please check server logs');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    return null;
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
    console.log(token);
  }

  async resetPassword(id: number, newPassword: string) {
    const hashedPassword: string = await bcrypt.hash(newPassword, 10);
    return this.usersService.update(id, { password: hashedPassword });
  }

  async resetPasswordToken(token: string, newPasswrod: string) {
    try {
      const payload = await this.jwtService.verify(token);

      if (typeof payload === 'object' && 'email' in payload) {
        this.resetPassword(payload.id, newPasswrod);
      } else {
        throw new BadRequestException();
      }
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
