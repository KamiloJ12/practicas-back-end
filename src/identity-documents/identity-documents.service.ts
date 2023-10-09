import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateIdentityDocumentDto } from './dto/create-identity-document.dto';
import { UpdateIdentityDocumentDto } from './dto/update-identity-document.dto';

import { IdentityDocument } from './entities/identity-document.entity';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class IdentityDocumentsService {
  constructor(
    @InjectRepository(IdentityDocument)
    private identityDocumentRepository: Repository<IdentityDocument>,
  ) {}

  async create(
    file: Express.Multer.File,
    createIdentityDocumentDto: CreateIdentityDocumentDto,
  ) {
    const identityDocument = this.identityDocumentRepository.create({
      ...createIdentityDocumentDto,
      documentFile: file.filename,
    });
    return await this.identityDocumentRepository.save(identityDocument);
  }

  findAll() {
    return this.identityDocumentRepository.find();
  }

  findOne(id: number) {
    return this.identityDocumentRepository.findOneBy({ id });
  }

  update(id: number, updateIdentityDocumentDto: UpdateIdentityDocumentDto) {
    return this.identityDocumentRepository.update(
      id,
      updateIdentityDocumentDto,
    );
  }

  remove(id: number) {
    return this.identityDocumentRepository.softRemove({ id });
  }

  image(documentName: string) {
    const path = join(
      __dirname,
      '../../uploadedFiles/identityDocuments',
      documentName,
    );
    if (!existsSync(path))
      throw new BadRequestException(`No document with name ${documentName}`);
    return path;
  }
}
