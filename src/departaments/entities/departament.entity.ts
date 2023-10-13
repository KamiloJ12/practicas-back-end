import { Country } from 'src/countries/entities/country.entity';
import { Municipality } from 'src/municipalities/entities/municipality.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Municipality, (municipality) => municipality.departament)
  public municipalities: Municipality[];
}
