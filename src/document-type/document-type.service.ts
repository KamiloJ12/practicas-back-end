import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { UpdateDocumentTypeDto } from './dto/update-document-type.dto';
import { DocumentType } from './entities/document-type.entity';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
  ) {}

  async create(
    createDocumentTypeDto: CreateDocumentTypeDto,
  ): Promise<DocumentType> {
    try {
      const documentType = this.documentTypeRepository.create(
        createDocumentTypeDto,
      );
      return await this.documentTypeRepository.save(documentType);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'El tipo de documento ya se encuentra registrado',
        );
      }
      throw new InternalServerErrorException('Error interno en el servidor');
    }
  }

  async findAll(): Promise<DocumentType[]> {
    return await this.documentTypeRepository.find();
  }

  async findOneById(id: number): Promise<DocumentType> {
    return await this.documentTypeRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateDocumentTypeDto: UpdateDocumentTypeDto,
  ): Promise<UpdateResult> {
    return await this.documentTypeRepository.update(id, updateDocumentTypeDto);
  }

  async remove(id: number): Promise<{ id: number } & DocumentType> {
    return await this.documentTypeRepository.softRemove({ id });
  }
}
