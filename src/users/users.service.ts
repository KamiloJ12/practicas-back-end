import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Crea un nuevo usuario.
   * @param createUserDto - Datos del usuario a crear.
   * @returns El usuario creado.
   * @throws BadRequestException si el usuario ya existe.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Hasheamos la contraseña antes de guardarla en la base de datos.
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
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  /**
   * Busca un usuario por su dirección de correo electrónico.
   * @param email - Correo electrónico del usuario a buscar.
   * @returns El usuario encontrado.
   * @throws NotFoundException si el usuario no existe.
   */
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  /**
   * Busca un usuario por su ID.
   * @param id - ID del usuario a buscar.
   * @returns El usuario encontrado.
   * @throws NotFoundException si el usuario no existe.
   */
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario con este ID no existe');
    }
    return user;
  }

  /**
   * Obtiene todos los usuarios.
   * @returns Un array de usuarios.
   */
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Actualiza un usuario por su ID.
   * @param id - ID del usuario a actualizar.
   * @param updateUserDto - Datos para actualizar el usuario.
   * @returns El usuario actualizado.
   * @throws NotFoundException si el usuario no existe.
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException('Usuario no encotrado');
    }
    return await this.usersRepository.save(user);
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - ID del usuario a eliminar.
   * @returns El usuario eliminado.
   * @throws NotFoundException si el usuario no existe.
   */
  async remove(id: number): Promise<{ id: number } & User> {
    const affiliationType = await this.usersRepository.findOneBy({
      id,
    });
    if (!affiliationType) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return await this.usersRepository.softRemove(affiliationType);
  }

  /**
   * Marca el correo electrónico de un usuario como confirmado.
   * @param email - Correo electrónico del usuario a marcar.
   */
  async markEmailAsConfirmed(email: string): Promise<void> {
    await this.usersRepository.update({ email }, { isEmailConfirmed: true });
  }
}
