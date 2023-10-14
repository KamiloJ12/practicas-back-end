import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthCareCompaniesEnrollmentDto } from './create-health-care-companies-enrollment.dto';

export class UpdateHealthCareCompaniesEnrollmentDto extends PartialType(CreateHealthCareCompaniesEnrollmentDto) {}
