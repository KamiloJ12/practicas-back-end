import { Country } from 'src/countries/entities/country.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Departament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Country, (country) => country.departaments)
  country: Country;
}
