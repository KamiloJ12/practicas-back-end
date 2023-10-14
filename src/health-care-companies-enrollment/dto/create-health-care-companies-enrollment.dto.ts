import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { HealthCareCompany } from 'src/health-care-companies/entities/health-care-company.entity';

export class CreateHealthCareCompaniesEnrollmentDto {
  @IsNotEmpty()
  @IsString()
  affiliationType: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  affiliationDate: Date;

  @IsNotEmpty()
  healthCareCompany: HealthCareCompany;
}
