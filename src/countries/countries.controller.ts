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
import { Country } from './entities/country.entity';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  /**
   * Crea un nuevo país.
   * @param createCountryDto - Datos para crear el país.
   * @returns El país creado.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Post()
  async create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return await this.countriesService.create(createCountryDto);
  }

  /**
   * Obtiene una lista de todos los países.
   * @returns Una lista de países disponibles.
   */
  @Public()
  @Get()
  async getCountries(): Promise<Country[]> {
    return await this.countriesService.findAll();
  }

  /**
   * Obtiene un país por su ID.
   * @param id - ID del país a recuperar.
   * @returns El país correspondiente al ID proporcionado.
   */
  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Country> {
    return await this.countriesService.findOne(id);
  }

  /**
   * Obtiene un país por su nombre.
   * @param name - Nombre del país a recuperar.
   * @returns El país correspondiente al nombre proporcionado.
   */
  @Public()
  @Get('name/:name')
  async findOneByName(@Param('name') name: string): Promise<Country[]> {
    return await this.countriesService.findByName(name);
  }

  /**
   * Actualiza un país por su ID.
   * @param id - ID del país a actualizar.
   * @param updateCountryDto - Datos para actualizar el país.
   * @returns El país actualizado.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    return this.countriesService.update(id, updateCountryDto);
  }

  /**
   * Elimina un país por su ID.
   * @param id - ID del país a eliminar.
   * @returns El país eliminado.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ id: number } & Country> {
    return this.countriesService.remove(id);
  }
}
