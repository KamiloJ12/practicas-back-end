import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignUpDto,
  ResetPasswordDto,
  PasswordResetDto,
  ResetPasswordTokenDto,
} from './dto';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Inicia sesión de usuario utilizando las credenciales proporcionadas.
   * @param req - La solicitud HTTP con el usuario autenticado.
   * @returns Un usuario con token de autenticación si las credenciales son válidas.
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Req() req): Promise<{ user: User; access_token: string }> {
    return this.authService.generateAuthToken(req.user);
  }

  /**
   * Registra un nuevo usuario.
   * @param signUpDto - Los datos para crear un nuevo usuario.
   * @returns El usuario registrado con token de autenticación.
   */
  @Public()
  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ user: User; access_token: string }> {
    return await this.authService.signUp(signUpDto);
  }

  /**
   * Genera un nuevo token de autenticación basado en el usuario actual.
   * @param req - La solicitud HTTP con el usuario autenticado.
   * @returns Un usuario con nuevo token de autenticación.
   */
  @Get('check-token')
  async checkToken(@Req() req): Promise<{ user: User; access_token: string }> {
    return this.authService.generateAuthToken(req.user);
  }

  /**
   * Restablece la contraseña del usuario.
   * @param req - La solicitud HTTP con el usuario autenticado.
   * @param resetPasswordDto - Los datos para restablecer la contraseña.
   * @returns El resultado del restablecimiento de contraseña.
   */
  @Patch('reset-password')
  async resetPassword(
    @Req() req,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<User> {
    const { id } = req.user;
    return await this.authService.resetPassword(
      id,
      resetPasswordDto.newPassword,
    );
  }

  /**
   * Solicita un restablecimiento de contraseña para un usuario por correo electrónico.
   * @param passwordResetDto - Los datos para solicitar el restablecimiento de contraseña.
   * @returns El resultado de la solicitud de restablecimiento de contraseña.
   */
  @Public()
  @Post('request-password-reset')
  async requestPasswordReset(
    @Body() passwordResetDto: PasswordResetDto,
  ): Promise<void> {
    // Verifica si el correo existe y envía un enlace de restablecimiento de contraseña
    return await this.authService.requestPasswordReset(passwordResetDto.email);
  }

  /**
   * Restablece la contraseña del usuario utilizando un token.
   * @param resetPasswordTokenDto - Los datos para restablecer la contraseña con un token.
   * @returns El resultado del restablecimiento de contraseña.
   */
  @Public()
  @Patch('reset-password-token')
  async resetPasswordToken(
    @Body() resetPasswordTokenDto: ResetPasswordTokenDto,
  ): Promise<User> {
    // Verifica el token y restablece la contraseña
    return await this.authService.resetPasswordToken(
      resetPasswordTokenDto.token,
      resetPasswordTokenDto.newPassword,
    );
  }
}
