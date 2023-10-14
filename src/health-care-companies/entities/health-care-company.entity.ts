import {
  Column,
  DeleteDateColumn,
  Entity,
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

  @DeleteDateColumn()
  deletedAt: Date;
}
