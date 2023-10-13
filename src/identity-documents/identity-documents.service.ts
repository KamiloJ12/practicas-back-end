import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateIdentityDocumentDto } from './dto/create-identity-document.dto';
import { UpdateIdentityDocumentDto } from './dto/update-identity-document.dto';

import { IdentityDocument } from './entities/identity-document.entity';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

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
    return this.identityDocumentRepository.find({
      relations: ['documentType'],
    });
  }

  findOne(id: number) {
    return this.identityDocumentRepository.findOne({
      where: { id },
      relations: ['documentType'],
    });
  }

  async update(
    id: number,
    updateIdentityDocumentDto: UpdateIdentityDocumentDto,
    file?: Express.Multer.File,
  ) {
    if (file) {
      const identityDocument = await this.findOne(id);
      const documentName = identityDocument.documentFile;
      const path = join(
        __dirname,
        '../../upload/identityDocuments',
        documentName,
      );
      unlinkSync(path);

      return this.identityDocumentRepository.update(id, {
        ...updateIdentityDocumentDto,
        documentFile: file.filename,
      });
    }

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
      '../../upload/identityDocuments',
      documentName,
    );
    if (!existsSync(path))
      throw new BadRequestException(`No document with name ${documentName}`);
    return path;
  }
}
