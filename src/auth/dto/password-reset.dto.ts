import { IsEmail, IsNotEmpty } from 'class-validator';

// DTO para restablecer contraseña
export class PasswordResetDto {
  // El campo "email" no debe estar vacío
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })

  // Debe ser una dirección de correo electrónico válida
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;
}
