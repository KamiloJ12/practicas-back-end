import { HealthCareCompaniesEnrollment } from 'src/health-care-companies-enrollment/entities/health-care-companies-enrollment.entity'; // Importación de la entidad relacionada "HealthCareCompaniesEnrollment"

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
export class AffiliationType {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único del tipo de afiliación

  @Column({ unique: true }) // Define una columna única para el nombre del tipo de afiliación
  name: string; // Nombre del tipo de afiliación (debe ser único)

  @OneToMany(
    () => HealthCareCompaniesEnrollment,
    (healthCareCompaniesEnrollment) =>
      healthCareCompaniesEnrollment.affiliationType,
  )
  enrollments: HealthCareCompaniesEnrollment[]; // Relación uno a muchos con las inscripciones de empresas de atención médica

  @CreateDateColumn() // Columna para la fecha de creación
  createdDate: Date; // Fecha en la que se creó el tipo de afiliación

  @UpdateDateColumn() // Columna para la fecha de última actualización
  updatedDate: Date; // Fecha de la última actualización del tipo de afiliación

  @DeleteDateColumn() // Columna para la fecha de eliminación lógica (si se aplica)
  deletedAt: Date; // Fecha de eliminación lógica del tipo de afiliación
}
