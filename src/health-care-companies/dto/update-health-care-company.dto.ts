import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthCareCompanyDto } from './create-health-care-company.dto';

export class UpdateHealthCareCompanyDto extends PartialType(CreateHealthCareCompanyDto) {}
