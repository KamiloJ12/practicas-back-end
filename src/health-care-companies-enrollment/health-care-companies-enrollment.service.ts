import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateHealthCareCompaniesEnrollmentDto } from './dto/create-health-care-companies-enrollment.dto';
import { UpdateHealthCareCompaniesEnrollmentDto } from './dto/update-health-care-companies-enrollment.dto';
import { HealthCareCompaniesEnrollment } from './entities/health-care-companies-enrollment.entity';

@Injectable()
export class HealthCareCompaniesEnrollmentService {
  constructor(
    @InjectRepository(HealthCareCompaniesEnrollment)
    private healthCareCompaniesEnrollmentRepository: Repository<HealthCareCompaniesEnrollment>,
  ) {}

  async create(
    createHealthCareCompaniesEnrollmentDto: CreateHealthCareCompaniesEnrollmentDto,
    fileId?: string,
  ): Promise<HealthCareCompaniesEnrollment> {
    try {
      if (fileId) {
        const healthCareCompaniesEnrollment =
          this.healthCareCompaniesEnrollmentRepository.create({
            ...createHealthCareCompaniesEnrollmentDto,
            documentHealthFile: fileId,
          });
        return await this.healthCareCompaniesEnrollmentRepository.save(
          healthCareCompaniesEnrollment,
        );
      }
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

  async findAll(): Promise<HealthCareCompaniesEnrollment[]> {
    return await this.healthCareCompaniesEnrollmentRepository.find();
  }

  async findOne(id: number): Promise<HealthCareCompaniesEnrollment> {
    return await this.healthCareCompaniesEnrollmentRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateHealthCareCompaniesEnrollmentDto: UpdateHealthCareCompaniesEnrollmentDto,
  ): Promise<UpdateResult> {
    return await this.healthCareCompaniesEnrollmentRepository.update(
      id,
      updateHealthCareCompaniesEnrollmentDto,
    );
  }

  async remove(
    id: number,
  ): Promise<{ id: number } & HealthCareCompaniesEnrollment> {
    return await this.healthCareCompaniesEnrollmentRepository.softRemove({
      id,
    });
  }
}
