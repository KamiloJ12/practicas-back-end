import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Department } from 'src/departaments/entities/department.entity';
import { DevelopmentArea } from 'src/development_areas/entities/development_area.entity';
import { HealthCareCompaniesEnrollment } from 'src/health-care-companies-enrollment/entities/health-care-companies-enrollment.entity';
import { IdentityDocument } from 'src/identity-documents/entities/identity-document.entity';
import { Municipality } from 'src/municipalities/entities/municipality.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  address: string;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  phoneNumber: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsPositive()
  studentCode: number;

  @IsOptional()
  @IsString()
  classScheduleFile: string;

  @IsOptional()
  @IsString()
  pictureFile: string;

  @IsOptional()
  @IsString()
  resumeDocumentFile: string;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @IsPositive()
  currentSemester: number;

  // Relaciones
  @IsNotEmpty()
  identityDocument: IdentityDocument;

  @Optional()
  user: User;

  @IsNotEmpty()
  residenceDepartament: Department;

  @IsNotEmpty()
  residenceMunicipality: Municipality;

  @IsNotEmpty()
  healthCareCompanyEnrollment: HealthCareCompaniesEnrollment;

  @IsNotEmpty()
  developmentArea: DevelopmentArea;
}
