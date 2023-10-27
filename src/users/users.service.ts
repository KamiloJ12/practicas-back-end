import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import * as csv from 'csv-parser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword: string = await bcrypt.hash(
        createUserDto.password,
        10,
      );
      const user = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El usuario ya se encuentra registrado');
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) return user;
    throw new NotFoundException('User with this email does not exist');
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) return user;
    throw new NotFoundException('User with this id does not exist');
  }

  async processCSV(file) {
    if (!file) {
      throw new BadRequestException('No se ha proporcionado un archivo.');
    }
    //const users: CreateUserDto[] = [];

    file
      .pipe(csv())
      .on('data', (row) => {
        console.log(row);
      })
      .on('end', async () => {});
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.softRemove({ id });
  }

  markEmailAsConfirmed(email: string) {
    return this.usersRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }
}
