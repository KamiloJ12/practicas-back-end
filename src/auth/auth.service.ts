import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { EmailConfirmationService } from 'src/email-confirmation/email-confirmation.service';
import { EmailService } from 'src/email/email.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailConfirmationService: EmailConfirmationService,
    private emailService: EmailService,
  ) {}

  /**
   * Registra un nuevo usuario.
   * @param signUpDto - Los datos para crear un nuevo usuario.
   * @returns Un token de autenticación si el registro es exitoso.
   */
  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ user: User; access_token: string }> {
    try {
      const user = await this.usersService.create(signUpDto);
      this.emailConfirmationService.sendVerificationLink(signUpDto.email);
      return this.generateAuthToken(user);
    } catch (error) {
      if (error?.code === '23505') {
        throw new BadRequestException('El correo ya se encuentra registrado');
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  /**
   * Valida las credenciales del usuario al iniciar sesión.
   * @param email - El correo del usuario.
   * @param password - La contraseña del usuario.
   * @returns El usuario autenticado si las credenciales son válidas.
   */
  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      const isMatch = await bcrypt.compare(password, user.password);

      if (user && isMatch) {
        return user;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException('Correo o contraseña incorrecta');
    }
  }

  /**
   * Genera un token de autenticación para un usuario.
   * @param user - El usuario para el que se generará el token.
   * @returns El usuario y el token de autenticación.
   */
  generateAuthToken(user: User): { user: User; access_token: string } {
    const payload = { email: user.email, id: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  // TODO: Cambiar url a sendEmailResetPassword
  /**
   * Envia una solicitud de restablecimiento de contraseña por correo electrónico.
   * @param email - El correo del usuario que solicita el restablecimiento de contraseña.
   * @returns Una confirmación de que la solicitud ha sido enviada.
   */
  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('El correo no se encuentra registrado');
    }

    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload);
    const url = `${this.configService.get('RESET_PASSWORD_URL')}/${token}`;

    return await this.emailService.sendEmailResetPassword(
      user.email,
      url,
      '10 minutos',
    );
  }

  /**
   * Restablece la contraseña del usuario.
   * @param id - El ID del usuario cuya contraseña se va a restablecer.
   * @param newPassword - La nueva contraseña del usuario.
   * @returns El resultado del restablecimiento de contraseña.
   */
  async resetPassword(id: number, newPassword: string): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(newPassword, 10);
    return await this.usersService.update(id, { password: hashedPassword });
  }

  /**
   * Restablece la contraseña del usuario utilizando un token.
   * @param token - El token de restablecimiento de contraseña.
   * @param newPassword - La nueva contraseña del usuario.
   * @returns El resultado del restablecimiento de contraseña.
   */
  async resetPasswordToken(token: string, newPassword: string): Promise<User> {
    try {
      const payload: JwtPayload = await this.jwtService.verify(token);
      if (typeof payload === 'object' && 'id' in payload) {
        return this.resetPassword(payload.id, newPassword);
      } else {
        throw new BadRequestException();
      }
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('El token ha expirado');
      }
      throw new BadRequestException('El token es incorrecto');
    }
  }
}
