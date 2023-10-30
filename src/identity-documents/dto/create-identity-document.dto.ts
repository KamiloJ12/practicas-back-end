import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { DocumentType } from 'src/document-type/entities/document-type.entity';
import { Municipality } from 'src/municipalities/entities/municipality.entity';

export class CreateIdentityDocumentDto {
  @IsNotEmpty()
  @IsString()
  documentNumber: string;

  @IsNotEmpty()
  documentType: DocumentType;

  @Optional()
  documentFile: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  issuanceDate: Date; // fecha de emision

  @IsNotEmpty()
  issuancePlace: Municipality; // lugar de emision
}
