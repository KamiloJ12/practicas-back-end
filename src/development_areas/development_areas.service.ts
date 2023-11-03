import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDevelopmentAreaDto } from './dto/create-development_area.dto';
import { UpdateDevelopmentAreaDto } from './dto/update-development_area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DevelopmentArea } from './entities/development_area.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DevelopmentAreasService {
  constructor(
    @InjectRepository(DevelopmentArea)
    private developmentAreaRepository: Repository<DevelopmentArea>,
  ) {}

  async create(
    createDevelopmentAreaDto: CreateDevelopmentAreaDto,
  ): Promise<DevelopmentArea> {
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

  async findAll(): Promise<DevelopmentArea[]> {
    return await this.developmentAreaRepository.find();
  }

  async findOne(id: number): Promise<DevelopmentArea> {
    return await this.developmentAreaRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateDevelopmentAreaDto: UpdateDevelopmentAreaDto,
  ): Promise<UpdateResult> {
    return await this.developmentAreaRepository.update(
      id,
      updateDevelopmentAreaDto,
    );
  }

  async remove(id: number): Promise<{ id: number } & DevelopmentArea> {
    return await this.developmentAreaRepository.softRemove({ id });
  }
}
