import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '../enums/role.enum';

// DTO para registrar un nuevo usuario
export class SignUpDto {
  // El campo "email" no debe estar vacío
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })

  // Debe ser una dirección de correo electrónico válida
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  // El campo "password" no debe estar vacío
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })

  // Debe ser una cadena de texto
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })

  // Debe tener al menos 6 caracteres
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })

  // Se elimina cualquier espacio en blanco adicional alrededor de la contraseña
  @Transform(({ value }) => value.trim()) // Elimina espacios en blanco alrededor
  password: string;

  // El campo "role" debe ser un valor válido del enum "UserRole"
  @IsEnum(Role, { message: 'El rol no es válido' })
  role: Role;
}
