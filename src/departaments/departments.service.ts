import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  /**
   * Crea un nuevo departamento.
   * @param createDepartmentDto - Datos para crear el departamento.
   * @returns El departamento creado.
   * @throws BadRequestException si el departamento ya está registrado.
   * @throws InternalServerErrorException si ocurre un error interno en el servidor.
   */
  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    try {
      const department = this.departmentRepository.create(createDepartmentDto);
      return await this.departmentRepository.save(department);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El departamento ya se encuentra registrado',
        );
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  /**
   * Obtiene una lista de todos los departamentos.
   * @returns Una lista de departamentos.
   */
  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  /**
   * Busca departamentos por nombre.
   * @param name - Nombre del departamento a buscar.
   * @returns Una lista de departamentos que coinciden con el nombre proporcionado.
   */
  async findByName(name: string): Promise<Department[]> {
    return await this.departmentRepository.find({
      where: {
        name: Like(`%${name.toLowerCase()}%`),
      },
    });
  }

  /**
   * Obtiene un departamento por su ID.
   * @param id - ID del departamento a buscar.
   * @returns El departamento encontrado.
   * @throws NotFoundException si el dapartamento no existe.
   */
  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['municipalities'],
    });
    if (!department) {
      throw new NotFoundException('Departamento no encontrado');
    }
    return department;
  }

  /**
   * Obtiene una lista de departamentos por el ID del país al que pertenecen.
   * @param countryId - ID del país.
   * @returns Una lista de departamentos que pertenecen al país especificado.
   */
  async findByCountry(countryId: number): Promise<Department[]> {
    return await this.departmentRepository.find({
      where: { country: { id: countryId } },
    });
  }

  /**
   * Actualiza un departamento por su ID y devuelve la entidad actualizada.
   * @param id - ID del departamento a actualizar.
   * @param updateDepartmentDto - Datos para actualizar el departamento.
   * @returns El departamento actualizado.
   * @throws NotFoundException si el dapartamento no existe.
   */
  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const department = await this.departmentRepository.preload({
      id,
      ...updateDepartmentDto,
    });

    if (!department) {
      throw new NotFoundException('País no encontrado');
    }

    return await this.departmentRepository.save(department);
  }

  /**
   * Elimina un departamento por su ID.
   * @param id - ID del departamento a eliminar.
   * @returns Información sobre el departamento eliminado.
   * @throws NotFoundException si el dapartamento no existe.
   */
  async remove(id: number): Promise<{ id: number } & Department> {
    const department = await this.departmentRepository.findOneBy({
      id,
    });
    if (!department) {
      throw new NotFoundException('País no encontrado');
    }
    return await this.departmentRepository.softRemove(department);
  }
}
