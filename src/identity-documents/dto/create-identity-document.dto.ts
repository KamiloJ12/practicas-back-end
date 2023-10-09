import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/* class DocumentType {
  @IsNumber()
  id: number;
} */

export class CreateIdentityDocumentDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  documentNumber: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  type: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  issuanceDate: Date; // fecha de emision

  @IsNotEmpty()
  @IsString()
  issuancePlace: string; // fecha de emision
}
