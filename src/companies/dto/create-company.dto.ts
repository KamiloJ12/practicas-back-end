import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';
import { LegalRepresentative } from 'src/legal-representative/entities/legal-representative.entity';

export class CreateCompanyDto {
  // El campo "name" no debe estar vacío
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })

  // Debe ser una cadena de texto
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  // El campo "nit" no debe estar vacío
  @IsNotEmpty({ message: 'El nit no puede estar vacío' })

  // Debe ser una cadena de texto
  @IsString({ message: 'El nit debe ser una cadena de texto' })
  nit: string;

  // El campo "description" no debe estar vacío
  @IsNotEmpty({ message: 'El descripcion no puede estar vacío' })

  // Debe ser una cadena de texto
  @IsString({ message: 'El descripcion debe ser una cadena de texto' })
  description: string;

  // El campo "address" no debe estar vacío
  @IsNotEmpty({ message: 'La direccion no puede estar vacío' })

  // Debe ser una cadena de texto
  @IsString({ message: 'La direccion debe ser una cadena de texto' })
  address: string;

  // El campo "phoneNumber" no debe estar vacío
  @IsNotEmpty({ message: 'El número de telefono no puede estar vacío' })

  // Debe ser un int
  @IsInt({ message: 'El número de telefono debe ser un número entero' })

  // Debe ser un numero positivo
  @IsPositive({ message: 'El número de telefono debe ser un número positivo' })
  phoneNumber: number;

  // El campo "email" no debe estar vacío
  @IsNotEmpty({ message: 'El email no puede estar vacío' })

  // Debe ser una cadena de texto
  @IsString({ message: 'El email debe ser una cadena de texto' })
  email: string;

  // El campo "legalRepresentative" no debe estar vacío
  @IsNotEmpty({ message: 'El representante legal no puede estar vacío' })
  legalRepresentative: LegalRepresentative;
}
