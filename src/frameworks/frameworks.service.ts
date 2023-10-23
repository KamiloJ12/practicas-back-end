import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateFrameworkDto } from './dto/create-framework.dto';
import { UpdateFrameworkDto } from './dto/update-framework.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Framework } from './entities/framework.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FrameworksService {
  constructor(
    @InjectRepository(Framework)
    private frameworkRepository: Repository<Framework>,
  ) {}

  async create(createFrameworkDto: CreateFrameworkDto) {
    try {
      const framework = this.frameworkRepository.create(createFrameworkDto);
      return await this.frameworkRepository.save(framework);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El framework ya se encuentra registrado',
        );
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  findAll() {
    return this.frameworkRepository.find();
  }

  findOne(id: number) {
    return this.frameworkRepository.findOneBy({ id });
  }

  update(id: number, updateFrameworkDto: UpdateFrameworkDto) {
    return this.frameworkRepository.update(id, updateFrameworkDto);
  }

  remove(id: number) {
    return this.frameworkRepository.softDelete(id);
  }
}
