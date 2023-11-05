import { Module } from '@nestjs/common';
import { LegalRepresentativeService } from './legal-representative.service';
import { LegalRepresentativeController } from './legal-representative.controller';

@Module({
  controllers: [LegalRepresentativeController],
  providers: [LegalRepresentativeService],
})
export class LegalRepresentativeModule {}
