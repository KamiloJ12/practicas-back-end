import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { Municipality } from './entities/municipality.entity';

import { CreateMunicipalityDto, UpdateMunicipalityDto } from './dto';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @InjectRepository(Municipality)
    private municipalyRepository: Repository<Municipality>,
  ) {}

  async create(
    createMunicipalityDto: CreateMunicipalityDto,
  ): Promise<Municipality> {
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

  async findAll(): Promise<Municipality[]> {
    return await this.municipalyRepository.find();
  }

  async findByName(name: string): Promise<Municipality[]> {
    return await this.municipalyRepository.find({
      where: {
        name: Like(`%${name.toLowerCase()}%`),
      },
    });
  }

  async findOne(id: number): Promise<Municipality> {
    return await this.municipalyRepository.findOneBy({ id });
  }

  async findByDepartment(departmentId: number): Promise<Municipality[]> {
    return await this.municipalyRepository.find({
      where: { department: { id: departmentId } },
    });
  }

  async update(
    id: number,
    updateMunicipalityDto: UpdateMunicipalityDto,
  ): Promise<UpdateResult> {
    return await this.municipalyRepository.update(id, updateMunicipalityDto);
  }

  async remove(id: number): Promise<{ id: number } & Municipality> {
    return await this.municipalyRepository.softRemove({ id });
  }
}
