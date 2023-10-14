import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { IdentityDocument } from 'src/identity-documents/entities/identity-document.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firtName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  studentCode: number;

  @IsNotEmpty()
  @IsString()
  classScheduleDocumentFile: string;

  @IsNotEmpty()
  @IsString()
  gender: 'Femenino' | 'Maculino';

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  phoneNumber: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  currentSemester: number;

  @IsNotEmpty()
  resumeDocumentFile: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  identityDocument: IdentityDocument;

  @IsNotEmpty()
  user: User;
}
