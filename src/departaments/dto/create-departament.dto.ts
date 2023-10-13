import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartamentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
