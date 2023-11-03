import { IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO para restablecer la contraseña con un token
export class ResetPasswordTokenDto {
  // El campo "newPassword" no debe estar vacío
  @IsNotEmpty({ message: 'La nueva contraseña no puede estar vacía' })

  // Debe ser una cadena de texto
  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto' })

  // Debe tener al menos 6 caracteres
  @MinLength(6, {
    message: 'La nueva contraseña debe tener al menos 6 caracteres',
  })
  newPassword: string;

  // El campo "token" no debe estar vacío
  @IsNotEmpty({ message: 'El token no puede estar vacío' })

  // Debe ser una cadena de texto
  @IsString({ message: 'El token debe ser una cadena de texto' })
  token: string;
}
