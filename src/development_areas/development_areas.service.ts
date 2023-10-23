import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDevelopmentAreaDto } from './dto/create-development_area.dto';
import { UpdateDevelopmentAreaDto } from './dto/update-development_area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DevelopmentArea } from './entities/development_area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DevelopmentAreasService {
  constructor(
    @InjectRepository(DevelopmentArea)
    private developmentAreaRepository: Repository<DevelopmentArea>,
  ) {}

  async create(createDevelopmentAreaDto: CreateDevelopmentAreaDto) {
    try {
      const developmentArea = this.developmentAreaRepository.create(
        createDevelopmentAreaDto,
      );
      return await this.developmentAreaRepository.save(developmentArea);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El usuario ya tiene registrado sus areas de desarrollo',
        );
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  findAll() {
    return this.developmentAreaRepository.find();
  }

  findOne(id: number) {
    return this.developmentAreaRepository.findOneBy({ id });
  }

  update(id: number, updateDevelopmentAreaDto: UpdateDevelopmentAreaDto) {
    return this.developmentAreaRepository.update(id, updateDevelopmentAreaDto);
  }

  remove(id: number) {
    return this.developmentAreaRepository.softDelete(id);
  }
}
