import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    // Llamar al constructor de PassportStrategy con la estrategia 'jwt'
    // Configurar la estrategia con opciones, como la extracción del token desde el encabezado Bearer
    // y el secreto para verificar la firma del token JWT.
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // No ignorar la expiración del token
      secretOrKey: configService.get('JWT_SECRET'), // Obtener el secreto del archivo de configuración
    });
  }

  /**
   * Valida un token JWT y devuelve el usuario correspondiente.
   * @param payload - Los datos del token JWT.
   * @returns El usuario si se encuentra o lanza una excepción de UnauthorizedException.
   */
  async validate(payload: JwtPayload) {
    // Llamar al servicio de usuarios para encontrar un usuario por su ID
    return this.usersService.findOneById(payload.id);
  }
}
