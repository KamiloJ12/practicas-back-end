import { Exclude } from 'class-transformer';
import { Student } from 'src/students/entities/student.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  role: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}
