import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    const country = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(country);
  }

  findAll() {
    return this.departmentRepository.find();
  }

  findOne(id: number) {
    return this.departmentRepository.findOneBy({ id });
  }

  findByName(name: string, country: number) {
    const lowerName = name.toLowerCase();

    const query = this.departmentRepository
      .createQueryBuilder('department')
      .where('LOWER(department.name) LIKE :term', { term: `%${lowerName}%` });

    if (!country) {
      query.andWhere('LOWER(department.country.id) = :country', { country });
    }

    return query.getMany();
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentRepository.update(id, updateDepartmentDto);
  }

  remove(id: number) {
    return this.departmentRepository.softRemove({ id });
  }
}
