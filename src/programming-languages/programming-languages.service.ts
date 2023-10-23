import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProgrammingLanguageDto } from './dto/create-programming-language.dto';
import { UpdateProgrammingLanguageDto } from './dto/update-programming-language.dto';
import { ProgrammingLanguage } from './entities/programming-language.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProgrammingLanguagesService {
  constructor(
    @InjectRepository(ProgrammingLanguage)
    private programmingLanguageRepository: Repository<ProgrammingLanguage>,
  ) {}

  async create(createProgrammingLanguageDto: CreateProgrammingLanguageDto) {
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

  findAll() {
    return this.programmingLanguageRepository.find();
  }

  findOne(id: number) {
    return this.programmingLanguageRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateProgrammingLanguageDto: UpdateProgrammingLanguageDto,
  ) {
    return this.programmingLanguageRepository.update(
      id,
      updateProgrammingLanguageDto,
    );
  }

  remove(id: number) {
    return this.programmingLanguageRepository.softDelete(id);
  }
}
