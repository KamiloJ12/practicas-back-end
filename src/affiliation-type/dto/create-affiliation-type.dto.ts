import { IsNotEmpty, IsString, Length } from 'class-validator';

// DTO para crear un tipo de afiliación
export class CreateAffiliationTypeDto {
  // El campo "name" no debe estar vacío
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })

  // Debe ser una cadena de texto
  @IsString({ message: 'El nombre debe ser una cadena de texto' })

  // Debe tener al menos 3 caracteres
  @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
  name: string;
}
