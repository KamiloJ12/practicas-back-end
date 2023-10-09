import { Injectable } from '@nestjs/common';
import { CreateIdentityDocumentDto } from './dto/create-identity-document.dto';
import { UpdateIdentityDocumentDto } from './dto/update-identity-document.dto';
import { IdentityDocument } from './entities/identity-document.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdentityDocumentsService {
  constructor(
    @InjectRepository(IdentityDocument)
    private identityDocumentRepository: Repository<IdentityDocument>,
  ) {}

  async create(createIdentityDocumentDto: CreateIdentityDocumentDto) {
    const identityDocument = this.identityDocumentRepository.create(
      createIdentityDocumentDto,
    );
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
}
