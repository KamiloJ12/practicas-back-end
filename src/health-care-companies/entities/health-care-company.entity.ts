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
export class HealthCareCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nit: string;

  @Column({ default: 'eps' })
  type: string;

  @OneToMany(
    () => HealthCareCompaniesEnrollment,
    (healthCareCompaniesEnrollment) =>
      healthCareCompaniesEnrollment.healthCareCompany,
  )
  enrollments: HealthCareCompaniesEnrollment[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
