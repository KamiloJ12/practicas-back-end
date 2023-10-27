import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { Department } from './entities/department.entity';

import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    try {
      const country = this.departmentRepository.create(createDepartmentDto);
      return await this.departmentRepository.save(country);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El departamento ya se encuentra registrado',
        );
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async findByName(name: string): Promise<Department[]> {
    return await this.departmentRepository.find({
      where: {
        name: Like(`%${name.toLowerCase()}%`),
      },
    });
  }

  async findOne(id: number): Promise<Department> {
    return await this.departmentRepository.findOneBy({ id });
  }

  async findByCountry(countryId: number): Promise<Department[]> {
    return await this.departmentRepository.find({
      where: { country: { id: countryId } },
    });
  }

  async update(
    id: number,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<UpdateResult> {
    return await this.departmentRepository.update(id, updateDepartmentDto);
  }

  async remove(id: number): Promise<{ id: number } & Department> {
    return await this.departmentRepository.softRemove({ id });
  }
}
