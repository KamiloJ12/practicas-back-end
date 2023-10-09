import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = createdUser;
      return user;
    } catch (error) {
      if (error?.code === '23505') {
        throw new BadRequestException('User with that email already exists');
      }
      throw new InternalServerErrorException('Please check server logs');
    }
  }

  async validateUser(email: string, password: string) {
    const userBd = await this.usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, userBd.password);
    if (userBd && isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = userBd;
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
}
