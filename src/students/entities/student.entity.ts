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
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Department } from 'src/departaments/entities/department.entity';
import { Municipality } from 'src/municipalities/entities/municipality.entity';
import { HealthCareCompaniesEnrollment } from 'src/health-care-companies-enrollment/entities/health-care-companies-enrollment.entity';
import { ProgrammingLanguage } from 'src/programming-languages/entities/programming-language.entity';
import { Framework } from 'src/frameworks/entities/framework.entity';
import { DevelopmentArea } from '../../development_areas/entities/development_area.entity';

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

  @Column()
  pictureFile: string;

  @OneToOne(() => IdentityDocument, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  identityDocument: IdentityDocument;

  @OneToOne(() => User, {
    eager: true,
  })
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
  healthCareCompanyEnrollment: HealthCareCompaniesEnrollment;

  @ManyToMany(
    () => ProgrammingLanguage,
    (programmingLanguage: ProgrammingLanguage) => programmingLanguage.students,
  )
  @JoinTable()
  programmingLanguages: ProgrammingLanguage[];

  @ManyToMany(() => Framework, (framework: Framework) => framework.students)
  @JoinTable()
  frameworks: Framework[];

  @OneToOne(
    () => DevelopmentArea,
    (developmentArea: DevelopmentArea) => developmentArea.student,
  )
  @JoinColumn()
  developmentArea: DevelopmentArea;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
