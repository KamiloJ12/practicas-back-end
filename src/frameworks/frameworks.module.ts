import { Module } from '@nestjs/common';
import { FrameworksService } from './frameworks.service';
import { FrameworksController } from './frameworks.controller';
import { Framework } from './entities/framework.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Framework])],
  controllers: [FrameworksController],
  providers: [FrameworksService],
})
export class FrameworksModule {}
