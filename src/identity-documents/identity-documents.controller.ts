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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('identity-documents')
export class IdentityDocumentsController {
  constructor(
    private readonly identityDocumentsService: IdentityDocumentsService,
  ) {}

  @Roles(Role.COORDINATOR)
  @Post()
  create(@Body() createIdentityDocumentDto: CreateIdentityDocumentDto) {
    return this.identityDocumentsService.create(createIdentityDocumentDto);
  }

  @Roles(Role.COORDINATOR)
  @Get()
  findAll() {
    return this.identityDocumentsService.findAll();
  }

  @Roles(Role.COORDINATOR)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.identityDocumentsService.findOne(id);
  }

  @Roles(Role.COORDINATOR)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIdentityDocumentDto: UpdateIdentityDocumentDto,
  ) {
    return this.identityDocumentsService.update(id, updateIdentityDocumentDto);
  }

  @Roles(Role.COORDINATOR)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.identityDocumentsService.remove(id);
  }
}
