import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAffiliationTypeDto, UpdateAffiliationTypeDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AffiliationType } from './entities/affiliation-type.entity';

@Injectable()
export class AffiliationTypeService {
  constructor(
    @InjectRepository(AffiliationType)
    private affiliationTypeRepository: Repository<AffiliationType>,
  ) {}

  /**
   * Crear un nuevo tipo de afiliación.
   * @param createAffiliationTypeDto - Los datos para crear el tipo de afiliación.
   * @returns El tipo de afiliación creado.
   */
  async create(
    createAffiliationTypeDto: CreateAffiliationTypeDto,
  ): Promise<AffiliationType> {
    try {
      const { name } = createAffiliationTypeDto;
      const affiliationType = this.affiliationTypeRepository.create({
        name: name.toLowerCase(),
      });
      return await this.affiliationTypeRepository.save(affiliationType);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El tipo de afiliación ya se encuentra registrado',
        );
      }
      throw new Error('Error interno en el servidor');
    }
  }

  /**
   * Obtener una lista de todos los tipos de afiliación.
   * @returns Una lista de tipos de afiliación.
   */
  async findAll(): Promise<AffiliationType[]> {
    return await this.affiliationTypeRepository.find();
  }

  /**
   * Obtener un tipo de afiliación por su ID.
   * @param id - El ID del tipo de afiliación a recuperar.
   * @returns El tipo de afiliación o undefined si no se encuentra.
   */
  async findOne(id: number): Promise<AffiliationType | undefined> {
    return await this.affiliationTypeRepository.findOneBy({ id });
  }

  /**
   * Actualizar un tipo de afiliación por su ID.
   * @param id - El ID del tipo de afiliación a actualizar.
   * @param updateAffiliationTypeDto - Los datos para actualizar el tipo de afiliación.
   * @returns El tipo de afiliación actualizado.
   * @throws NotFoundException si el tipo de afiliación no se encuentra.
   */
  async update(
    id: number,
    updateAffiliationTypeDto: UpdateAffiliationTypeDto,
  ): Promise<AffiliationType> {
    const affiliationType = await this.affiliationTypeRepository.preload({
      id,
      ...updateAffiliationTypeDto,
    });

    if (!affiliationType) {
      throw new NotFoundException('Tipo de afiliación no encontrado');
    }
    return await this.affiliationTypeRepository.save(affiliationType);
  }

  /**
   * Eliminar un tipo de afiliación por su ID utilizando eliminación suave.
   * @param id - El ID del tipo de afiliación a eliminar.
   * @returns El tipo de afiliación eliminado.
   * @throws NotFoundException si el tipo de afiliación no se encuentra.
   */
  async remove(id: number): Promise<{ id: number } & AffiliationType> {
    const affiliationType = await this.affiliationTypeRepository.findOneBy({
      id,
    });
    if (!affiliationType) {
      throw new NotFoundException('Tipo de afiliación no encontrado');
    }

    return await this.affiliationTypeRepository.softRemove(affiliationType);
  }
}
