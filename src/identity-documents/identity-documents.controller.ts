import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  Optional,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateIdentityDocumentDto } from './dto/create-identity-document.dto';
import { UpdateIdentityDocumentDto } from './dto/update-identity-document.dto';
import { IdentityDocumentsService } from './identity-documents.service';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { diskStorage } from 'multer';
import { fileImagesFilter, fileNamer } from 'src/files/helpers';
import { Response } from 'express';

@Controller('identity-documents')
export class IdentityDocumentsController {
  constructor(
    private readonly identityDocumentsService: IdentityDocumentsService,
  ) {}

  @Roles(Role.Coordinator)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileImagesFilter,
      storage: diskStorage({
        destination: './upload/identityDocuments',
        filename: fileNamer,
      }),
    }),
  )
  @Post()
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createIdentityDocumentDto: CreateIdentityDocumentDto,
  ) {
    return this.identityDocumentsService.create(
      file,
      createIdentityDocumentDto,
    );
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
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileImagesFilter,
      storage: diskStorage({
        destination: './upload/identityDocuments',
        filename: fileNamer,
      }),
    }),
  )
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIdentityDocumentDto: UpdateIdentityDocumentDto,
    @UploadedFile() @Optional() file?: Express.Multer.File,
  ) {
    return this.identityDocumentsService.update(
      id,
      updateIdentityDocumentDto,
      file,
    );
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.identityDocumentsService.remove(id);
  }

  @Roles(Role.Coordinator)
  @Get('document/:documentName')
  findProductImage(
    @Param('documentName') documentName: string,
    @Res() res: Response,
  ) {
    const path = this.identityDocumentsService.image(documentName);
    return res.sendFile(path);
  }
}
