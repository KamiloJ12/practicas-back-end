import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriveService } from 'src/drive/drive.service';
import { IdentityDocumentsModule } from 'src/identity-documents/identity-documents.module';
import { HealthCareCompaniesEnrollmentModule } from '../health-care-companies-enrollment/health-care-companies-enrollment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    IdentityDocumentsModule,
    HealthCareCompaniesEnrollmentModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService, DriveService],
})
export class StudentsModule {}
