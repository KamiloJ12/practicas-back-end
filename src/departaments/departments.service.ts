import { Injectable } from '@nestjs/common';
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

  create(createDepartmentDto: CreateDepartmentDto) {
    const country = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(country);
  }

  async findAll(
    offset?: number,
    limit?: number,
    searchQuery?: string,
    country?: string,
  ) {
    const where = searchQuery
      ? {
          name: Like(`%${searchQuery.toLowerCase()}%`),
        }
      : {};

    if (country) {
      where['country.name'] = Like(`%${country.toLowerCase()}%`);
    }

    const [items, count] = await this.departmentRepository.findAndCount({
      where,
      order: {
        name: 'ASC',
      },
      skip: offset,
      take: limit,
      relations: ['country'], // Carga la relación "country"
    });

    return {
      items,
      count,
    };
  }

  findOne(id: number) {
    return this.departmentRepository.findOneBy({ id });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentRepository.update(id, updateDepartmentDto);
  }

  remove(id: number) {
    return this.departmentRepository.softRemove({ id });
  }
}
