import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliationTypeService } from './affiliation-type.service';
import { AffiliationTypeController } from './affiliation-type.controller';
import { AffiliationType } from './entities/affiliation-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AffiliationType])],
  controllers: [AffiliationTypeController],
  providers: [AffiliationTypeService],
})
export class AffiliationTypeModule {}
