import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  role: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
