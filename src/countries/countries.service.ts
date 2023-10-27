import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { Country } from './entities/country.entity';

import { CreateCountryDto, UpdateCountryDto } from './dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    try {
      const country = this.countriesRepository.create({
        name: createCountryDto.name.toLowerCase(),
      });
      return await this.countriesRepository.save(country);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El pais ya se encuentra registrado');
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  async findAll(): Promise<Country[]> {
    return await this.countriesRepository.find();
  }

  async findByName(name: string): Promise<Country[]> {
    return await this.countriesRepository.find({
      where: {
        name: Like(`%${name.toLowerCase()}%`),
      },
      relations: ['departments'],
    });
  }

  async findOne(id: number): Promise<Country> {
    return await this.countriesRepository.findOne({
      where: { id },
      relations: ['departments'],
    });
  }

  async update(
    id: number,
    updateCountryDto: UpdateCountryDto,
  ): Promise<UpdateResult> {
    return await this.countriesRepository.update(id, {
      name: updateCountryDto.name.toLowerCase(),
    });
  }

  async remove(id: number): Promise<{ id: number } & Country> {
    return await this.countriesRepository.softRemove({ id });
  }
}
