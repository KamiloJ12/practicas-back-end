import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Department } from 'src/departaments/entities/department.entity';
import { IdentityDocument } from 'src/identity-documents/entities/identity-document.entity';
import { Municipality } from 'src/municipalities/entities/municipality.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Optional()
  @IsNumber()
  @IsPositive()
  studentCode: number;

  @Optional()
  @IsString()
  classScheduleDocumentFile: string;

  @IsNotEmpty()
  @IsString()
  gender: 'Femenino' | 'Masculino';

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value).toISOString())
  birthdate: Date;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  phoneNumber: number;

  @Optional()
  @IsNumber()
  @IsPositive()
  currentSemester: number;

  @Optional()
  user: User;

  @Optional()
  resumeDocumentFile: string;

  @Optional()
  pictureFile: string;

  @IsNotEmpty()
  residenceDepartament: Department;

  @IsNotEmpty()
  residenceMunicipality: Municipality;
  /* @IsNotEmpty()
  status: string;
 */

  @IsOptional()
  identityDocument: IdentityDocument;

  //TODO: Falta modificar dto
}
