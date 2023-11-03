import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Llamar al constructor de PassportStrategy con la estrategia 'local'
    // Configurar la estrategia para usar el campo 'email' como nombre de usuario
    super({
      usernameField: 'email',
    });
  }

  /**
   * Valida un usuario localmente utilizando el servicio de autenticación.
   * @param email - El correo electrónico del usuario.
   * @param password - La contraseña del usuario.
   * @returns El usuario si es válido o null si no se encuentra o las credenciales son incorrectas.
   */
  async validate(email: string, password: string): Promise<User> {
    // Llamar al servicio de autenticación para validar al usuario
    const user = await this.authService.validateUser(email, password);
    return user;
  }
}
