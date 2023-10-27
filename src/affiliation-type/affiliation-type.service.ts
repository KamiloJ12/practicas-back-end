import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { AffiliationType } from './entities/affiliation-type.entity';

import { CreateAffiliationTypeDto, UpdateAffiliationTypeDto } from './dto';

@Injectable()
export class AffiliationTypeService {
  constructor(
    @InjectRepository(AffiliationType)
    private affiliationTypeRepository: Repository<AffiliationType>,
  ) {}

  async create(
    createAffiliationTypeDto: CreateAffiliationTypeDto,
  ): Promise<AffiliationType> {
    try {
      const country = this.affiliationTypeRepository.create({
        name: createAffiliationTypeDto.name.toLowerCase(),
      });
      return await this.affiliationTypeRepository.save(country);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El tipo de afiliacion ya se encuentra registrado',
        );
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  async findAll(): Promise<AffiliationType[]> {
    return await this.affiliationTypeRepository.find();
  }

  async findOne(id: number): Promise<AffiliationType> {
    return await this.affiliationTypeRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateAffiliationTypeDto: UpdateAffiliationTypeDto,
  ): Promise<UpdateResult> {
    return await this.affiliationTypeRepository.update(id, {
      name: updateAffiliationTypeDto.name.toLowerCase(),
    });
  }

  async remove(id: number): Promise<{ id: number } & AffiliationType> {
    return await this.affiliationTypeRepository.softRemove({ id });
  }
}
