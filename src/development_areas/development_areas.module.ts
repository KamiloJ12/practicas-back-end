import { Module } from '@nestjs/common';
import { DevelopmentAreasService } from './development_areas.service';
import { DevelopmentAreasController } from './development_areas.controller';
import { DevelopmentArea } from './entities/development_area.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DevelopmentArea])],
  controllers: [DevelopmentAreasController],
  providers: [DevelopmentAreasService],
})
export class DevelopmentAreasModule {}
