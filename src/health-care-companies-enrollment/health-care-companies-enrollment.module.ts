import { Module } from '@nestjs/common';
import { HealthCareCompaniesEnrollmentService } from './health-care-companies-enrollment.service';
import { HealthCareCompaniesEnrollmentController } from './health-care-companies-enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCareCompaniesEnrollment } from './entities/health-care-companies-enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HealthCareCompaniesEnrollment])],
  controllers: [HealthCareCompaniesEnrollmentController],
  providers: [HealthCareCompaniesEnrollmentService],
})
export class HealthCareCompaniesEnrollmentModule {}
