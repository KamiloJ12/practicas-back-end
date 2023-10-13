import { IdentityDocument } from 'src/identity-documents/entities/identity-document.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class DocumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => IdentityDocument,
    (IdentityDocument) => IdentityDocument.documentType,
  )
  documents: IdentityDocument[];
}
