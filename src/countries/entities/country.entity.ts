import { Department } from 'src/departaments/entities/department.entity'; // Importación de la entidad "Department" relacionada
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() // Define que esta clase es una entidad de la base de datos.
export class Country {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único del país

  @Column({ unique: true }) // Define una columna única para el nombre del país
  name: string; // Nombre del país

  @OneToMany(() => Department, (department) => department.country) // Establece una relación uno a muchos con la entidad "Department" a través del campo "country"
  departments: Department[]; // Lista de departamentos relacionados con este país

  @CreateDateColumn() // Columna para la fecha de creación
  createdDate: Date; // Fecha en la que se creó el país

  @UpdateDateColumn() // Columna para la fecha de última actualización
  updatedDate: Date; // Fecha de la última actualización del país

  @DeleteDateColumn() // Columna para la fecha de eliminación lógica (si se aplica)
  deletedAt: Date; // Fecha de eliminación lógica del país
}
