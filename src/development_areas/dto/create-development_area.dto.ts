import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Student } from '../../students/entities/student.entity';

export class CreateDevelopmentAreaDto {
  @IsNumber()
  @IsPositive()
  hardSoftMaintenance: number;

  @IsNumber()
  @IsPositive()
  networkMaintenance: number;

  @IsNumber()
  @IsPositive()
  training: number;

  @IsNumber()
  @IsPositive()
  softDevelopment: number;

  @IsNumber()
  @IsPositive()
  cloudComputing: number;

  @IsNumber()
  @IsPositive()
  projectManager: number;

  @IsNumber()
  @IsPositive()
  artificialIntelligence: number;

  @IsNotEmpty()
  student: Student;
}
