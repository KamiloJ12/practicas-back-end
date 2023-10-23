import { PartialType } from '@nestjs/swagger';
import { CreateDevelopmentAreaDto } from './create-development_area.dto';

export class UpdateDevelopmentAreaDto extends PartialType(CreateDevelopmentAreaDto) {}
