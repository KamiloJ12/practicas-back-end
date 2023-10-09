import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { IdentityDocumentsService } from './identity-documents.service';
import { CreateIdentityDocumentDto } from './dto/create-identity-document.dto';
import { UpdateIdentityDocumentDto } from './dto/update-identity-document.dto';

@Controller('identity-documents')
export class IdentityDocumentsController {
  constructor(
    private readonly identityDocumentsService: IdentityDocumentsService,
  ) {}

  @Post()
  create(@Body() createIdentityDocumentDto: CreateIdentityDocumentDto) {
    return this.identityDocumentsService.create(createIdentityDocumentDto);
  }

  @Get()
  findAll() {
    return this.identityDocumentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.identityDocumentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIdentityDocumentDto: UpdateIdentityDocumentDto,
  ) {
    return this.identityDocumentsService.update(id, updateIdentityDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.identityDocumentsService.remove(id);
  }
}
