import { IsDate, IsNumber, IsString } from 'class-validator';

class DocumentType {
  @IsNumber()
  id: number;
}

export class CreateIdentityDocumentDto {
  @IsNumber()
  documentNumber: number;

  type: DocumentType;

  @IsDate()
  IssuanceDate: Date; // fecha de emision

  @IsString()
  IssuancePlace: string; // fecha de emision

  @IsString()
  documentFile: string; // documento => pdf
}
