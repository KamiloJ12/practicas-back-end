import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHealthCareCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nit: string;
}
