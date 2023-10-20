import { Body, Controller, Post, Req } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmEmailDto } from './dto/confirm-email.dto';

@Controller('email-confirmation')
export class EmailConfirmationController {
  constructor(private emailConfirmationService: EmailConfirmationService) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }

  @Post('resend-confirmation-link')
  async resendConfirmationLink(@Req() req) {
    await this.emailConfirmationService.resendConfirmationLink(req.user.id);
  }
}
