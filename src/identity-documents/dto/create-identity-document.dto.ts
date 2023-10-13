import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DocumentType } from 'src/document-type/entities/document-type.entity';

export class CreateIdentityDocumentDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  documentNumber: number;

  @IsNotEmpty()
  documentType: DocumentType;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  issuanceDate: Date; // fecha de emision

  @IsNotEmpty()
  @IsString()
  issuancePlace: string; // fecha de emision
}
