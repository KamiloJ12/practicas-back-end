import { IsNotEmpty, IsString } from 'class-validator';
import { Country } from 'src/countries/entities/country.entity';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  country: Country;
}
