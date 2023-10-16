import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartamentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartamentsController],
  providers: [DepartmentsService],
})
export class DepartamentsModule {}
