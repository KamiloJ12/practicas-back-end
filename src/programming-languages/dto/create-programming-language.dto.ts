import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProgrammingLanguageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}
