import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMunicipalityDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
