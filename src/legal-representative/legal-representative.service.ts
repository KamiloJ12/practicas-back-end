import { Injectable } from '@nestjs/common';
import { CreateLegalRepresentativeDto } from './dto/create-legal-representative.dto';
import { UpdateLegalRepresentativeDto } from './dto/update-legal-representative.dto';

@Injectable()
export class LegalRepresentativeService {
  create(createLegalRepresentativeDto: CreateLegalRepresentativeDto) {
    return 'This action adds a new legalRepresentative';
  }

  findAll() {
    return `This action returns all legalRepresentative`;
  }

  findOne(id: number) {
    return `This action returns a #${id} legalRepresentative`;
  }

  update(id: number, updateLegalRepresentativeDto: UpdateLegalRepresentativeDto) {
    return `This action updates a #${id} legalRepresentative`;
  }

  remove(id: number) {
    return `This action removes a #${id} legalRepresentative`;
  }
}
