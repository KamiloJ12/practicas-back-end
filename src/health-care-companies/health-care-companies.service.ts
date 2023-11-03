import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateHealthCareCompanyDto } from './dto/create-health-care-company.dto';
import { UpdateHealthCareCompanyDto } from './dto/update-health-care-company.dto';
import { HealthCareCompany } from './entities/health-care-company.entity';

@Injectable()
export class HealthCareCompaniesService {
  constructor(
    @InjectRepository(HealthCareCompany)
    private healthCareCompanyRepository: Repository<HealthCareCompany>,
  ) {}

  async create(
    createHealthCareCompanyDto: CreateHealthCareCompanyDto,
  ): Promise<HealthCareCompany> {
    try {
      const healthCareCompany = this.healthCareCompanyRepository.create(
        createHealthCareCompanyDto,
      );
      return await this.healthCareCompanyRepository.save(healthCareCompany);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('La EPS ya se encuentra registrada');
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  async findAll(): Promise<HealthCareCompany[]> {
    return await this.healthCareCompanyRepository.find();
  }

  async findOne(id: number): Promise<HealthCareCompany> {
    return await this.healthCareCompanyRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateHealthCareCompanyDto: UpdateHealthCareCompanyDto,
  ): Promise<UpdateResult> {
    return await this.healthCareCompanyRepository.update(
      id,
      updateHealthCareCompanyDto,
    );
  }

  async remove(id: number): Promise<{ id: number } & HealthCareCompany> {
    return await this.healthCareCompanyRepository.softRemove({ id });
  }
}
