import { HealthCareCompaniesEnrollment } from 'src/health-care-companies-enrollment/entities/health-care-companies-enrollment.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class HealthCareCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nit: string;

  @OneToMany(
    () => HealthCareCompaniesEnrollment,
    (healthCareCompaniesEnrollment) =>
      healthCareCompaniesEnrollment.healthCareCompany,
  )
  enrollments: HealthCareCompaniesEnrollment[];

  @DeleteDateColumn()
  deletedAt: Date;
}
