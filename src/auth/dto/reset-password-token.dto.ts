import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordTokenDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
