import { Module } from '@nestjs/common';
import { IdentityDocumentsService } from './identity-documents.service';
import { IdentityDocumentsController } from './identity-documents.controller';
import { IdentityDocument } from './entities/identity-document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([IdentityDocument])],
  controllers: [IdentityDocumentsController],
  providers: [IdentityDocumentsService],
  exports: [IdentityDocumentsService],
})
export class IdentityDocumentsModule {}
