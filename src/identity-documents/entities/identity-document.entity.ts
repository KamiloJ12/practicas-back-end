import { DocumentType } from 'src/document-type/entities/document-type.entity';
import { Municipality } from 'src/municipalities/entities/municipality.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class IdentityDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  documentNumber: string;

  @ManyToOne(
    () => Municipality,
    (municipality) => municipality.identityDocuments,
  )
  issuancePlace: Municipality; // fecha de emision

  @Column()
  issuanceDate: Date; // fecha de emision

  @Column()
  documentFile: string; // documento => pdf

  @ManyToOne(() => DocumentType, (documentType) => documentType.documents)
  documentType: DocumentType;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
