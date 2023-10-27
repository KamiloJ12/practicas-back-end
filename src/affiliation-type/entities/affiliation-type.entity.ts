import { HealthCareCompaniesEnrollment } from 'src/health-care-companies-enrollment/entities/health-care-companies-enrollment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AffiliationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => HealthCareCompaniesEnrollment,
    (healthCareCompaniesEnrollment) =>
      healthCareCompaniesEnrollment.affiliationType,
  )
  enrollments: HealthCareCompaniesEnrollment[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
