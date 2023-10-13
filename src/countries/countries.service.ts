import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
  ) {}

  create(createCountryDto: CreateCountryDto) {
    const country = this.countriesRepository.create(createCountryDto);
    return this.countriesRepository.save(country);
  }

  findAll() {
    return this.countriesRepository.find();
  }

  findOne(id: number) {
    return this.countriesRepository.findBy({ id });
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return this.countriesRepository.update(id, updateCountryDto);
  }

  remove(id: number) {
    return this.countriesRepository.softDelete({ id });
  }
}
