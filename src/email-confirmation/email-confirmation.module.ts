import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailConfirmationService } from './email-confirmation.service';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
import { EmailConfirmationController } from './email-confirmation.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ConfigModule, JwtModule, EmailModule, UsersModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
