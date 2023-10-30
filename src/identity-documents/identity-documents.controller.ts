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

import { CreateIdentityDocumentDto } from './dto/create-identity-document.dto';
import { UpdateIdentityDocumentDto } from './dto/update-identity-document.dto';
import { IdentityDocumentsService } from './identity-documents.service';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('identity-documents')
export class IdentityDocumentsController {
  constructor(
    private readonly identityDocumentsService: IdentityDocumentsService,
  ) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createIdentityDocumentDto: CreateIdentityDocumentDto) {
    return this.identityDocumentsService.create(createIdentityDocumentDto);
  }

  @Roles(Role.Coordinator)
  @Get()
  findAll() {
    return this.identityDocumentsService.findAll();
  }

  @Roles(Role.Coordinator)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.identityDocumentsService.findOne(id);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIdentityDocumentDto: UpdateIdentityDocumentDto,
  ) {
    return this.identityDocumentsService.update(id, updateIdentityDocumentDto);
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.identityDocumentsService.remove(id);
  }
}
