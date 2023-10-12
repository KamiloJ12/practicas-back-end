import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(options: ISendMailOptions) {
    try {
      return await this.mailerService.sendMail(options);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async sendEmailConfirmation(
    webSiteName: string,
    email: string,
    url: string,
    expirationTime: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: `Verificación de Correo Electrónico para ${webSiteName}`,
        template: './confirmation',
        context: {
          email,
          webSiteName,
          url,
          expirationTime,
        },
      });
    } catch (error) {
      new InternalServerErrorException();
    }
  }

  async sendEmailResetPassword(
    email: string,
    url: string,
    expirationTime: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: `Recuperación de Contraseña`,
        template: './reset-password',
        context: {
          email,
          url,
          expirationTime,
        },
      });
    } catch (error) {
      new InternalServerErrorException();
    }
  }
}
