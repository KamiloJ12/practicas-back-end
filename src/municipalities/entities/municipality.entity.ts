import { Department } from 'src/departaments/entities/department.entity';
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

  @ManyToOne(() => Department, (department) => department.municipalities)
  department: Department;

  @OneToMany(() => Student, (student) => student.residenceMunicipality)
  students: Student[];

  @OneToMany(
    () => IdentityDocument,
    (identityDocument) => identityDocument.issuancePlace,
  )
  identityDocuments: IdentityDocument[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
