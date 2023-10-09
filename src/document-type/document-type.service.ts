import { Injectable } from '@nestjs/common';
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
    const newUser = this.documentTypeRepository.create(createDocumentTypeDto);
    return await this.documentTypeRepository.save(newUser);
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
