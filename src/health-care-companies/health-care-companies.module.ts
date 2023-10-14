import { Module } from '@nestjs/common';
import { HealthCareCompaniesService } from './health-care-companies.service';
import { HealthCareCompaniesController } from './health-care-companies.controller';
import { HealthCareCompany } from './entities/health-care-company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HealthCareCompany])],
  controllers: [HealthCareCompaniesController],
  providers: [HealthCareCompaniesService],
})
export class HealthCareCompaniesModule {}
