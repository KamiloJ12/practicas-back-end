import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async create(
    createHealthCareCompaniesEnrollmentDto: CreateHealthCareCompaniesEnrollmentDto,
  ) {
    try {
      const healthCareCompaniesEnrollment =
        this.healthCareCompaniesEnrollmentRepository.create(
          createHealthCareCompaniesEnrollmentDto,
        );
      return await this.healthCareCompaniesEnrollmentRepository.save(
        healthCareCompaniesEnrollment,
      );
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El estudiante ya se tiene una eps registrada',
        );
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
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
