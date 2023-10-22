import { Country } from 'src/countries/entities/country.entity';
import { Municipality } from 'src/municipalities/entities/municipality.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Country, (country) => country.departments)
  country: Country;

  @OneToMany(() => Student, (student) => student.residenceDepartament)
  students: Student[];

  @OneToMany(() => Municipality, (municipality) => municipality.department)
  municipalities: Municipality[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
