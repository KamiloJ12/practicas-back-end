import { Injectable } from '@nestjs/common';
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

  create(createCountryDto: CreateCountryDto) {
    const country = this.countriesRepository.create({
      name: createCountryDto.name.toLowerCase(),
    });
    return this.countriesRepository.save(country);
  }

  findAll() {
    return this.countriesRepository.find();
  }

  findOne(id: number) {
    return this.countriesRepository.findBy({ id });
  }

  getSuggestions(name: string) {
    return this.countriesRepository.findBy({
      name: Like(`%${name.toLowerCase()}%`),
    });
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return this.countriesRepository.update(id, {
      name: updateCountryDto.name.toLowerCase,
    });
  }

  remove(id: number) {
    return this.countriesRepository.softRemove({ id });
  }
}
