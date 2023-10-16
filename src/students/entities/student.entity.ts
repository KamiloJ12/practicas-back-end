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
import { Department } from 'src/departaments/entities/department.entity';
import { Municipality } from 'src/municipalities/entities/municipality.entity';
import { HealthCareCompaniesEnrollment } from 'src/health-care-companies-enrollment/entities/health-care-companies-enrollment.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string; // Nombres

  @Column()
  lastName: string; // Apellidos

  @Column()
  gender: string;

  @Column()
  birthdate: Date;

  @Column()
  address: string; // dirección

  @Column({ type: 'bigint' })
  phoneNumber: number; // dirección de telefono

  @Column({ unique: true })
  studentCode: number; // Codigo

  @Column()
  classScheduleFile: string; // horario de clase -> documento

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

  @ManyToOne(() => Department, (department) => department.students)
  @JoinColumn()
  residenceDepartament: Department;

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
