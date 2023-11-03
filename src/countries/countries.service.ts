import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateCountryDto, UpdateCountryDto } from './dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
  ) {}

  /**
   * Crea un nuevo país.
   * @param createCountryDto - Datos para crear el país.
   * @returns El país creado.
   * @throws BadRequestException si el país ya está registrado.
   * @throws InternalServerErrorException si hay un error interno en el servidor.
   */
  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    try {
      const country = this.countriesRepository.create({
        name: createCountryDto.name.toLowerCase(),
      });
      return await this.countriesRepository.save(country);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('El país ya se encuentra registrado');
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  /**
   * Obtiene todos los países.
   * @returns Una lista de países.
   */
  async findAll(): Promise<Country[]> {
    return await this.countriesRepository.find();
  }

  /**
   * Busca países por nombre.
   * @param name - Nombre del país o parte del nombre.
   * @returns Una lista de países que coinciden con el nombre especificado.
   */
  async findByName(name: string): Promise<Country[]> {
    return await this.countriesRepository.find({
      where: {
        name: Like(`%${name.toLowerCase()}%`),
      },
      relations: ['departments'],
    });
  }

  /**
   * Obtiene un país por su ID.
   * @param id - ID del país a buscar.
   * @returns El país encontrado, o lanza una excepción NotFoundException si no se encuentra.
   * @throws NotFoundException si el país no existe.
   */
  async findOne(id: number): Promise<Country> {
    const country = await this.countriesRepository.findOne({
      where: { id },
      relations: ['departments'],
    });
    if (!country) {
      throw new NotFoundException('País no encontrado');
    }
    return country;
  }

  /**
   * Actualiza un país por su ID.
   * @param id - ID del país a actualizar.
   * @param updateCountryDto - Datos para actualizar el país.
   * @returns El país actualizado.
   * @throws NotFoundException si el país no existe.
   */
  async update(
    id: number,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    const country = await this.countriesRepository.preload({
      id,
      ...updateCountryDto,
    });

    if (!country) {
      throw new NotFoundException('País no encontrado');
    }

    return await this.countriesRepository.save(country);
  }

  /**
   * Elimina lógicamente un país por su ID.
   * @param id - ID del país a eliminar.
   * @returns Un objeto que contiene el ID del país eliminado.
   * @throws NotFoundException si el país no existe.
   */
  async remove(id: number): Promise<{ id: number } & Country> {
    const country = await this.countriesRepository.findOneBy({
      id,
    });
    if (!country) {
      throw new NotFoundException('País no encontrado');
    }
    return await this.countriesRepository.softRemove(country);
  }
}
