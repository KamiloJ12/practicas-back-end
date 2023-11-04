import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKnowledgeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
