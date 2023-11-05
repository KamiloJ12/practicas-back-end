import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, IsPositive } from 'class-validator';
import { IdentityDocument } from 'src/identity-documents/entities/identity-document.entity';

export class CreateLegalRepresentativeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  phoneNumber: number;

  // Relaciones
  @IsNotEmpty()
  identityDocument: IdentityDocument;
}
