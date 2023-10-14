import { Injectable } from '@nestjs/common';
import { CreateHealthCareCompaniesEnrollmentDto } from './dto/create-health-care-companies-enrollment.dto';
import { UpdateHealthCareCompaniesEnrollmentDto } from './dto/update-health-care-companies-enrollment.dto';
import { HealthCareCompaniesEnrollment } from './entities/health-care-companies-enrollment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HealthCareCompaniesEnrollmentService {
  constructor(
    @InjectRepository(HealthCareCompaniesEnrollment)
    private healthCareCompaniesEnrollmentRepository: Repository<HealthCareCompaniesEnrollment>,
  ) {}

  create(
    createHealthCareCompaniesEnrollmentDto: CreateHealthCareCompaniesEnrollmentDto,
  ) {
    const healthCareCompaniesEnrollment =
      this.healthCareCompaniesEnrollmentRepository.create(
        createHealthCareCompaniesEnrollmentDto,
      );
    return this.healthCareCompaniesEnrollmentRepository.save(
      healthCareCompaniesEnrollment,
    );
  }

  findAll() {
    return this.healthCareCompaniesEnrollmentRepository.find();
  }

  findOne(id: number) {
    return this.healthCareCompaniesEnrollmentRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateHealthCareCompaniesEnrollmentDto: UpdateHealthCareCompaniesEnrollmentDto,
  ) {
    return this.healthCareCompaniesEnrollmentRepository.update(
      id,
      updateHealthCareCompaniesEnrollmentDto,
    );
  }

  remove(id: number) {
    return this.healthCareCompaniesEnrollmentRepository.softDelete({ id });
  }
}
