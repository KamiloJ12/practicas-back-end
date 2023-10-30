import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateIdentityDocumentDto } from './dto/create-identity-document.dto';
import { UpdateIdentityDocumentDto } from './dto/update-identity-document.dto';

import { IdentityDocument } from './entities/identity-document.entity';

@Injectable()
export class IdentityDocumentsService {
  constructor(
    @InjectRepository(IdentityDocument)
    private identityDocumentRepository: Repository<IdentityDocument>,
  ) {}

  async create(
    createIdentityDocumentDto: CreateIdentityDocumentDto,
  ): Promise<IdentityDocument> {
    const identityDocument = this.identityDocumentRepository.create(
      createIdentityDocumentDto,
    );
    return await this.identityDocumentRepository.save(identityDocument);
  }

  async findAll(): Promise<IdentityDocument[]> {
    return await this.identityDocumentRepository.find({
      relations: ['documentType'],
    });
  }

  async findOne(id: number): Promise<IdentityDocument> {
    return await this.identityDocumentRepository.findOne({
      where: { id },
      relations: ['documentType'],
    });
  }

  async update(
    id: number,
    updateIdentityDocumentDto: UpdateIdentityDocumentDto,
  ): Promise<UpdateResult> {
    return await this.identityDocumentRepository.update(
      id,
      updateIdentityDocumentDto,
    );
  }

  async remove(id: number): Promise<{ id: number } & IdentityDocument> {
    return await this.identityDocumentRepository.softRemove({ id });
  }
}
