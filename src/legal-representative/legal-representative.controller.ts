import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LegalRepresentativeService } from './legal-representative.service';
import { CreateLegalRepresentativeDto } from './dto/create-legal-representative.dto';
import { UpdateLegalRepresentativeDto } from './dto/update-legal-representative.dto';

@Controller('legal-representative')
export class LegalRepresentativeController {
  constructor(private readonly legalRepresentativeService: LegalRepresentativeService) {}

  @Post()
  create(@Body() createLegalRepresentativeDto: CreateLegalRepresentativeDto) {
    return this.legalRepresentativeService.create(createLegalRepresentativeDto);
  }

  @Get()
  findAll() {
    return this.legalRepresentativeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.legalRepresentativeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLegalRepresentativeDto: UpdateLegalRepresentativeDto) {
    return this.legalRepresentativeService.update(+id, updateLegalRepresentativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.legalRepresentativeService.remove(+id);
  }
}
