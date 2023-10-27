import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProgrammingLanguageDto } from './dto/create-programming-language.dto';
import { UpdateProgrammingLanguageDto } from './dto/update-programming-language.dto';
import { ProgrammingLanguage } from './entities/programming-language.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProgrammingLanguagesService {
  constructor(
    @InjectRepository(ProgrammingLanguage)
    private programmingLanguageRepository: Repository<ProgrammingLanguage>,
  ) {}

  async create(
    createProgrammingLanguageDto: CreateProgrammingLanguageDto,
  ): Promise<ProgrammingLanguage> {
    try {
      const programmingLanguage = this.programmingLanguageRepository.create(
        createProgrammingLanguageDto,
      );
      return await this.programmingLanguageRepository.save(programmingLanguage);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El lenguage de programacion ya se encuentra registrado',
        );
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  async findAll(): Promise<ProgrammingLanguage[]> {
    return await this.programmingLanguageRepository.find();
  }

  async findOne(id: number): Promise<ProgrammingLanguage> {
    return await this.programmingLanguageRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateProgrammingLanguageDto: UpdateProgrammingLanguageDto,
  ): Promise<UpdateResult> {
    return await this.programmingLanguageRepository.update(
      id,
      updateProgrammingLanguageDto,
    );
  }

  async remove(id: number): Promise<{ id: number } & ProgrammingLanguage> {
    return await this.programmingLanguageRepository.softRemove({ id });
  }
}
