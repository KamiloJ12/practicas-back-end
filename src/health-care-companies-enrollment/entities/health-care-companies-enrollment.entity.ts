import { HealthCareCompany } from 'src/health-care-companies/entities/health-care-company.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class HealthCareCompaniesEnrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  affiliationType: string;

  @Column()
  affiliationDate: Date;

  @Column()
  document: string;

  @ManyToOne(
    () => HealthCareCompany,
    (healthCareCompany) => healthCareCompany.enrollments,
  )
  @JoinColumn()
  healthCareCompany: HealthCareCompany;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
