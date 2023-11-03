import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Country } from 'src/countries/entities/country.entity';

// DTO para crear un departamento
export class CreateDepartmentDto {
  // El campo "name" no debe estar vacío
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })

  // Debe ser una cadena de texto
  @IsString({ message: 'El nombre debe ser una cadena de texto' })

  // Debe tener al menos 6 caracteres
  @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
  name: string;

  // El campo "country" debe ser un objeto de tipo "Country" (entidad de país)
  // Se encargará de relacionar este departamento con un país existente.
  @IsNotEmpty({ message: 'El país no puede estar vacío' })
  country: Country;
}
