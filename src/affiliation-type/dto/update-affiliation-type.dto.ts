import { PartialType } from '@nestjs/swagger';
import { CreateAffiliationTypeDto } from './create-affiliation-type.dto';

export class UpdateAffiliationTypeDto extends PartialType(CreateAffiliationTypeDto) {}
