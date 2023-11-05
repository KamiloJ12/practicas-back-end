import { LegalRepresentative } from 'src/legal-representative/entities/legal-representative.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nit: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column({ type: 'bigint' })
  phoneNumber: number;

  @Column()
  email: string;

  @Column({ default: false })
  hasAnAgreement: boolean;

  @OneToOne(() => LegalRepresentative, {
    eager: true,
  })
  @JoinColumn()
  legalRepresentative: LegalRepresentative;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
