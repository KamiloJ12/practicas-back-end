import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CountriesService } from './countries.service';

import { CreateCountryDto, UpdateCountryDto } from './dto';

import { Roles, Public } from 'src/auth/decorators';
import { Role } from 'src/auth/enums/role.enum';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Public()
  @Get()
  getCountries() {
    return this.countriesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.findOne(id);
  }

  @Public()
  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.countriesService.findByName(name);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.countriesService.remove(id);
  }
}
