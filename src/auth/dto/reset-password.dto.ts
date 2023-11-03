import { IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO para restablecer la contraseña
export class ResetPasswordDto {
  // El campo "newPassword" no debe estar vacío
  @IsNotEmpty({ message: 'La nueva contraseña no puede estar vacía' })

  // Debe ser una cadena de texto
  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto' })

  // Debe tener al menos 6 caracteres
  @MinLength(6, {
    message: 'La nueva contraseña debe tener al menos 6 caracteres',
  })
  newPassword: string;
}
