import { HealthCareCompany } from 'src/health-care-companies/entities/health-care-company.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @DeleteDateColumn()
  deletedAt: Date;
}
