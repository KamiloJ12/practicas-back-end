import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
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

  findAll() {
    return this.departmentRepository.find();
  }

  findByName(name: string) {
    return this.departmentRepository.find({
      where: {
        name: Like(`%${name.toLowerCase()}%`),
      },
    });
  }

  findOne(id: number) {
    return this.departmentRepository.findOneBy({ id });
  }

  findOneByName(name: string) {
    return this.departmentRepository.findOne({
      where: {
        name: Like(`%${name.toLowerCase()}%`),
      },
    });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentRepository.update(id, updateDepartmentDto);
  }

  remove(id: number) {
    return this.departmentRepository.softRemove({ id });
  }
}
