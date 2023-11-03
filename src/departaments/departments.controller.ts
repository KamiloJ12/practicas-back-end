import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Roles, Public } from 'src/auth/decorators';
import { Role } from 'src/auth/enums/role.enum';
import { Department } from './entities/department.entity';

@Controller('departments')
export class DepartamentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  /**
   * Crea un nuevo departamento.
   * @param createDepartmentDto - Datos para crear el departamento.
   * @returns El departamento creado.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Post()
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return await this.departmentsService.create(createDepartmentDto);
  }

  /**
   * Obtiene una lista de todos los departamentos.
   * @returns Una lista de departamentos.
   */
  @Public()
  @Get()
  async findAll(): Promise<Department[]> {
    return await this.departmentsService.findAll();
  }

  /**
   * Obtiene un departamento por su ID.
   * @param id - ID del departamento a buscar.
   * @returns El departamento encontrado.
   */
  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Department> {
    return await this.departmentsService.findOne(id);
  }

  /**
   * Busca departamentos por nombre.
   * @param name - Nombre del departamento a buscar.
   * @returns Una lista de departamentos que coinciden con el nombre proporcionado.
   */
  @Public()
  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Department[]> {
    return await this.departmentsService.findByName(name);
  }

  /**
   * Obtiene una lista de departamentos por el ID del país al que pertenecen.
   * @param countryId - ID del país.
   * @returns Una lista de departamentos que pertenecen al país especificado.
   */
  @Public()
  @Get('byCountry/:countryId')
  async findByCountry(
    @Param('countryId', ParseIntPipe) countryId: number,
  ): Promise<Department[]> {
    return await this.departmentsService.findByCountry(countryId);
  }

  /**
   * Actualiza un departamento por su ID.
   * @param id - ID del departamento a actualizar.
   * @param updateDepartmentDto - Datos para actualizar el departamento.
   * @returns El departamento actualizado.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    return await this.departmentsService.update(id, updateDepartmentDto);
  }

  /**
   * Elimina un departamento por su ID.
   * @param id - ID del departamento a eliminar.
   * @returns Información sobre el departamento eliminado.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ id: number } & Department> {
    return this.departmentsService.remove(id);
  }
}
