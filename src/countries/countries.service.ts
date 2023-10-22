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

  findAll() {
    return this.countriesRepository.find();
  }

  findOne(id: number) {
    return this.countriesRepository.findOne({
      where: { id },
      relations: ['departments'],
    });
  }

  findByName(name: string) {
    return this.countriesRepository.find({
      where: {
        name: Like(`%${name.toLowerCase()}%`),
      },
      relations: ['departments'],
    });
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
