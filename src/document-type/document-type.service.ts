import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentType } from './entities/document-type.entity';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
  ) {}

  async create(createDocumentTypeDto: CreateDocumentTypeDto) {
    try {
      const documentType = this.documentTypeRepository.create(
        createDocumentTypeDto,
      );
      return await this.documentTypeRepository.save(documentType);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El departamento ya se encuentra registrado',
        );
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  findAll() {
    return this.documentTypeRepository.find();
  }

  findOneById(id: number) {
    return this.documentTypeRepository.findOneBy({ id });
  }

  update(id: number, updateDocumentTypeDto: UpdateDocumentTypeDto) {
    return this.documentTypeRepository.update(id, updateDocumentTypeDto);
  }

  remove(id: number) {
    return this.documentTypeRepository.softRemove({ id });
  }
}
