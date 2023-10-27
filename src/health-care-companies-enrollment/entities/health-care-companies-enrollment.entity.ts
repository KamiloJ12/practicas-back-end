import { AffiliationType } from 'src/affiliation-type/entities/affiliation-type.entity';
import { HealthCareCompany } from 'src/health-care-companies/entities/health-care-company.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class HealthCareCompaniesEnrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => AffiliationType,
    (affiliationType) => affiliationType.enrollments,
  )
  affiliationType: AffiliationType;

  @Column()
  affiliationDate: Date;

  @Column()
  documentHealthFile: string;

  @ManyToOne(
    () => HealthCareCompany,
    (healthCareCompany) => healthCareCompany.enrollments,
  )
  healthCareCompany: HealthCareCompany;

  @OneToOne(() => Student, (student) => student.healthCareCompanyEnrollment)
  student: Student;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
