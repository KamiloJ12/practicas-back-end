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

  @Column({ unique: true })
  documentNumber: number;

  @ManyToOne(() => DocumentType, (DocumentType) => DocumentType.documents)
  documentType: DocumentType;

  @Column()
  issuanceDate: Date; // fecha de emision

  @Column()
  issuancePlace: string; // fecha de emision

  @Column()
  documentFile: string; // documento => pdf

  @DeleteDateColumn()
  deletedAt: Date;
}
