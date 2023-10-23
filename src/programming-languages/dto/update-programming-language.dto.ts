import { PartialType } from '@nestjs/mapped-types';
import { CreateProgrammingLanguageDto } from './create-programming-language.dto';

export class UpdateProgrammingLanguageDto extends PartialType(CreateProgrammingLanguageDto) {}
