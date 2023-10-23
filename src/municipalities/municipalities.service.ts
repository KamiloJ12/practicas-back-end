import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipality } from './entities/municipality.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @InjectRepository(Municipality)
    private municipalyRepository: Repository<Municipality>,
  ) {}

  async create(createMunicipalityDto: CreateMunicipalityDto) {
    try {
      const municipality = this.municipalyRepository.create(
        createMunicipalityDto,
      );
      return await this.municipalyRepository.save(municipality);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El municipio ya se encuentra registrado',
        );
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  findAll() {
    return this.municipalyRepository.find();
  }

  findByName(name: string) {
    return this.municipalyRepository.find({
      where: {
        name: Like(`%${name.toLowerCase()}%`),
      },
    });
  }

  findOne(id: number) {
    return this.municipalyRepository.findBy({ id });
  }

  findOneByName(name: string) {
    return this.municipalyRepository.findOne({
      where: {
        name: Like(`%${name.toLowerCase()}%`),
      },
    });
  }

  update(id: number, updateMunicipalityDto: UpdateMunicipalityDto) {
    return this.municipalyRepository.update(id, updateMunicipalityDto);
  }

  remove(id: number) {
    return this.municipalyRepository.softDelete({ id });
  }
}
