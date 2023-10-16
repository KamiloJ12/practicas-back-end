import { IsNotEmpty, IsString } from 'class-validator';
import { Departament } from 'src/departaments/entities/department.entity';

export class CreateMunicipalityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  departament: Departament;
}
