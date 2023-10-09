import { DocumentType } from 'src/document-type/entities/document-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class IdentityDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentNumber: number;

  @ManyToOne(() => DocumentType, (documentType) => documentType.documents)
  type: DocumentType;

  @Column()
  IssuanceDate: Date; // fecha de emision

  @Column()
  IssuancePlace: string; // fecha de emision

  @Column()
  documentFile: string; // documento => pdf

  @DeleteDateColumn()
  deletedAt: Date;
}
