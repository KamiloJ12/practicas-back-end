import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { AffiliationType } from 'src/affiliation-type/entities/affiliation-type.entity';
import { HealthCareCompany } from 'src/health-care-companies/entities/health-care-company.entity';

export class CreateHealthCareCompaniesEnrollmentDto {
  @IsNotEmpty()
  affiliationType: AffiliationType;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  affiliationDate: Date;

  @IsNotEmpty()
  healthCareCompany: HealthCareCompany;
}
