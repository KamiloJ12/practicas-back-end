import { Injectable } from '@nestjs/common';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departament } from './entities/departament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentsService {
  constructor(
    @InjectRepository(Departament)
    private departamentRepository: Repository<Departament>,
  ) {}

  create(createDepartamentDto: CreateDepartamentDto) {
    const country = this.departamentRepository.create(createDepartamentDto);
    return this.departamentRepository.save(country);
  }

  findAll() {
    return this.departamentRepository.find();
  }

  findOne(id: number) {
    return this.departamentRepository.findOneBy({ id });
  }

  update(id: number, updateDepartamentDto: UpdateDepartamentDto) {
    return this.departamentRepository.update(id, updateDepartamentDto);
  }

  remove(id: number) {
    return this.departamentRepository.softRemove({ id });
  }
}
