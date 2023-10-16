import { Injectable } from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @InjectRepository(Municipality)
    private municipalyRepository: Repository<Municipality>,
  ) {}

  create(createMunicipalityDto: CreateMunicipalityDto) {
    const municipality = this.municipalyRepository.create(
      createMunicipalityDto,
    );
    return this.municipalyRepository.save(municipality);
  }

  findAll() {
    return this.municipalyRepository.find();
  }

  findOne(id: number) {
    return this.municipalyRepository.findBy({ id });
  }

  getSuggestions(name: string, department: string) {
    const lowerName = name.toLowerCase();

    const query = this.municipalyRepository
      .createQueryBuilder('municipality')
      .leftJoinAndSelect('municipality.department', 'department')
      .where('municipality.name LIKE :term', { term: `%${lowerName}%` });

    if (department && department.trim().length != 0) {
      const lowerDepartment = department.toLowerCase();
      query.andWhere('department.name = :department', {
        department: lowerDepartment,
      });
    }

    return query.getMany();
  }

  update(id: number, updateMunicipalityDto: UpdateMunicipalityDto) {
    return this.municipalyRepository.update(id, updateMunicipalityDto);
  }

  remove(id: number) {
    return this.municipalyRepository.softDelete({ id });
  }
}
