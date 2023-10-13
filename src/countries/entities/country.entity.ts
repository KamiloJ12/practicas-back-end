import { Departament } from 'src/departaments/entities/departament.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Departament, (departament) => departament.country)
  departaments: Departament[];
}
