import { IsNotEmpty, IsString } from 'class-validator';
import { ProgrammingLanguage } from '../../programming-languages/entities/programming-language.entity';

export class CreateFrameworkDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  programmingLanguage: ProgrammingLanguage;
}
