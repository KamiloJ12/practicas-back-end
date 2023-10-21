import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    try {
      const country = this.countriesRepository.create({
        name: createCountryDto.name.toLowerCase(),
      });
      return await this.countriesRepository.save(country);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El pais ya se encuentra registrado');
      }
      throw new InternalServerErrorException('Error interno en el servidor+');
    }
  }

  async findAll(offset?: number, limit?: number, searchQuery?: string) {
    const where = searchQuery
      ? {
          name: Like(`%${searchQuery.toLowerCase()}%`),
        }
      : {};

    const [items, count] = await this.countriesRepository.findAndCount({
      where,
      order: {
        name: 'ASC',
      },
      skip: offset,
      take: limit,
    });

    return {
      items,
      count,
    };
  }

  findOne(id: number) {
    return this.countriesRepository.findBy({ id });
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return this.countriesRepository.update(id, {
      name: updateCountryDto.name.toLowerCase(),
    });
  }

  remove(id: number) {
    return this.countriesRepository.softRemove({ id });
  }
}
