import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAffiliationTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
