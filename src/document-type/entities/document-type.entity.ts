import { IdentityDocument } from 'src/identity-documents/entities/identity-document.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DocumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => IdentityDocument, (document) => document.documentType)
  documents: IdentityDocument[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
