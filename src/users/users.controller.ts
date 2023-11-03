import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Role } from '../auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Crea un nuevo usuario.
   * @param createUserDto - Datos para crear el usuario.
   * @returns El usuario creado.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  /**
   * Obtiene una lista de todos los usuarios.
   * @returns Una lista de usuarios.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id - ID del usuario a recuperar.
   * @returns El usuario encontrado.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  /**
   * Actualiza un usuario por su ID.
   * @param id - ID del usuario a actualizar.
   * @param updateUserDto - Datos para actualizar el usuario.
   * @returns El usuario actualizado.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - ID del usuario a eliminar.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ id: number } & User> {
    return await this.usersService.remove(id);
  }
}
