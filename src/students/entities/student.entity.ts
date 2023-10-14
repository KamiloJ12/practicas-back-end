import { User } from 'src/users/entities/user.entity';
import { IdentityDocument } from '../../identity-documents/entities/identity-document.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Departament } from 'src/departaments/entities/departament.entity';
import { Municipality } from 'src/municipalities/entities/municipality.entity';
import { HealthCareCompaniesEnrollment } from 'src/health-care-companies-enrollment/entities/health-care-companies-enrollment.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firtName: string; // Nombres

  @Column()
  lastName: string; // Apellidos

  @Column({ unique: true })
  studentCode: number; // Codigo

  @Column()
  classSchedule: string; // horario de clase -> documento

  @Column()
  gender: string;

  @Column()
  address: string; // dirección

  @Column({ type: 'bigint' })
  phoneNumber: number; // dirección de telefono

  @Column()
  currentSemester: number; // semetre actual

  @Column()
  resumeDocumentFile: string; // hoja de vida -> documento

  @Column()
  status: string;

  @OneToOne(() => IdentityDocument, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  identityDocument: IdentityDocument;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Departament, (departament) => departament.students)
  @JoinColumn()
  residenceDepartament: Departament;

  @ManyToOne(() => Municipality, (municipality) => municipality.students)
  @JoinColumn()
  residenceMunicipality: Municipality;

  @OneToOne(
    () => HealthCareCompaniesEnrollment,
    (healthCareCompaniesEnrollment) => healthCareCompaniesEnrollment.student,
  )
  @JoinColumn()
  healthCareCompany: HealthCareCompaniesEnrollment;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
