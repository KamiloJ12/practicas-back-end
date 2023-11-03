import { Country } from 'src/countries/entities/country.entity'; // Importación de la entidad "Country" relacionada
import { Municipality } from 'src/municipalities/entities/municipality.entity'; // Importación de la entidad "Municipality" relacionada
import { Student } from 'src/students/entities/student.entity'; // Importación de la entidad "Student" relacionada
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

@Entity() // Define que esta clase es una entidad de la base de datos.
export class Department {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único del departamento

  @Column()
  name: string; // Nombre del departamento

  @ManyToOne(() => Country, (country) => country.departments) // Establece una relación muchos a uno con la entidad "Country" a través del campo "country"
  country: Country; // País al que pertenece este departamento

  @OneToMany(() => Student, (student) => student.residenceDepartament) // Establece una relación uno a muchos con la entidad "Student" a través del campo "residenceDepartament"
  students: Student[]; // Lista de estudiantes que residen en este departamento

  @OneToMany(() => Municipality, (municipality) => municipality.department) // Establece una relación uno a muchos con la entidad "Municipality" a través del campo "department"
  municipalities: Municipality[]; // Lista de municipios dentro de este departamento

  @CreateDateColumn() // Columna para la fecha de creación
  createdDate: Date; // Fecha en la que se creó el departamento

  @UpdateDateColumn() // Columna para la fecha de última actualización
  updatedDate: Date; // Fecha de la última actualización del departamento

  @DeleteDateColumn() // Columna para la fecha de eliminación lógica (si se aplica)
  deletedAt: Date; // Fecha de eliminación lógica del departamento
}
