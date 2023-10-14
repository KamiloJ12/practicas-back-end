import { Departament } from 'src/departaments/entities/departament.entity';
import { IdentityDocument } from 'src/identity-documents/entities/identity-document.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Departament, (departament) => departament.municipalities)
  departament: Departament;

  @OneToMany(() => Student, (student) => student.residenceMunicipality)
  students: Student[];

  @OneToMany(
    () => IdentityDocument,
    (identityDocument) => identityDocument.issuancePlace,
  )
  public identityDocuments: IdentityDocument[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
