import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DevelopmentArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hardSoftMaintenance: number;

  @Column()
  networkMaintenance: number;

  @Column()
  training: number;

  @Column()
  softDevelopment: number;

  @Column()
  cloudComputing: number;

  @Column()
  projectManager: number;

  @Column()
  artificialIntelligence: number;

  @OneToOne(() => Student, (student: Student) => student.developmentArea)
  student: Student;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
