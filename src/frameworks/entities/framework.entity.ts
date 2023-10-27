import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProgrammingLanguage } from '../../programming-languages/entities/programming-language.entity';
import { Student } from 'src/students/entities/student.entity';

@Entity()
export class Framework {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  imageUrl: string;

  @ManyToOne(
    () => ProgrammingLanguage,
    (programmingLanguage: ProgrammingLanguage) =>
      programmingLanguage.frameworks,
  )
  programmingLanguage: ProgrammingLanguage;

  @ManyToMany(() => Student, (student: Student) => student.frameworks)
  students: Student[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
