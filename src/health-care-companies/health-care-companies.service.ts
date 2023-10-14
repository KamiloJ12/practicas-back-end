import { Injectable } from '@nestjs/common';
import { CreateHealthCareCompanyDto } from './dto/create-health-care-company.dto';
import { UpdateHealthCareCompanyDto } from './dto/update-health-care-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthCareCompany } from './entities/health-care-company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HealthCareCompaniesService {
  constructor(
    @InjectRepository(HealthCareCompany)
    private healthCareCompanyRepository: Repository<HealthCareCompany>,
  ) {}
  create(createHealthCareCompanyDto: CreateHealthCareCompanyDto) {
    const healthCareCompany = this.healthCareCompanyRepository.create(
      createHealthCareCompanyDto,
    );
    return this.healthCareCompanyRepository.save(healthCareCompany);
  }

  findAll() {
    return this.healthCareCompanyRepository.find();
  }

  findOne(id: number) {
    return this.healthCareCompanyRepository.findOneBy({ id });
  }

  update(id: number, updateHealthCareCompanyDto: UpdateHealthCareCompanyDto) {
    return this.healthCareCompanyRepository.update(
      id,
      updateHealthCareCompanyDto,
    );
  }

  remove(id: number) {
    return this.healthCareCompanyRepository.softDelete({ id });
  }
}
