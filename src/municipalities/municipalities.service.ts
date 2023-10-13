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

  update(id: number, updateMunicipalityDto: UpdateMunicipalityDto) {
    return this.municipalyRepository.update(id, updateMunicipalityDto);
  }

  remove(id: number) {
    return this.municipalyRepository.softDelete({ id });
  }
}
