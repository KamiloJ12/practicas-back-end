import { DocumentType } from 'src/document-type/entities/document-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class IdentityDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentNumber: number;

  @ManyToOne(() => DocumentType, { eager: true })
  @JoinColumn({ name: 'documentType' })
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
