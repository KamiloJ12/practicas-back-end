import { Departament } from 'src/departaments/entities/departament.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Departament, (departament) => departament.municipalities)
  departament: Departament;

  @OneToMany(() => Student, (student) => student.residenceMunicipality)
  students: Student[];
}
