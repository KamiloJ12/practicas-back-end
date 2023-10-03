import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Public()
  @Get('send-email')
  async sendEmail(): Promise<string> {
    try {
      await this.emailService.sendMail({
        from: 'cristiancamilojv@ufps.edu.co',
        to: 'camilo12052000@hotmail.com',
        subject: 'Asunto del correo',
        text: 'Cuerpo del correo',
      });
      return 'Correo enviado con éxito';
    } catch (error) {
      return `Error al enviar el correo: ${error.message}`;
    }
  }
}
