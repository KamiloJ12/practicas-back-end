import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Framework } from '../../frameworks/entities/framework.entity';
import { Student } from 'src/students/entities/student.entity';

@Entity()
export class ProgrammingLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  imageUrl: string;

  @OneToMany(
    () => Framework,
    (framework: Framework) => framework.programmingLanguage,
  )
  frameworks: Framework[];

  @ManyToMany(() => Student, (student: Student) => student.programmingLanguages)
  students: Student[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
