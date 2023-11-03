import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() // Define que esta clase es una entidad de la base de datos.
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único generado automáticamente para el usuario.

  @Column({ unique: true }) // Define una columna única para el correo electrónico del usuario.
  email: string; // Correo electrónico del usuario (debe ser único).

  @Column()
  password: string; // Contraseña del usuario.

  @Column({ default: true }) // Define una columna con valor predeterminado "true".
  isActive: boolean; // Indica si la cuenta del usuario está activa.

  @Column()
  role: string; // Rol del usuario.

  @Column({ default: false }) // Define una columna con valor predeterminado "false".
  isEmailConfirmed: boolean; // Indica si el correo electrónico del usuario está confirmado.

  @CreateDateColumn() // Columna para la fecha y hora de creación del registro de usuario.
  createdDate: Date; // Fecha y hora de creación del registro de usuario.

  @UpdateDateColumn() // Columna para la fecha y hora de la última actualización del registro de usuario.
  updatedDate: Date; // Fecha y hora de la última actualización del registro de usuario.

  @DeleteDateColumn() // Columna para la fecha y hora de eliminación lógica del registro de usuario (si se elimina).
  deletedAt: Date; // Fecha y hora de eliminación lógica del registro de usuario (si se aplica).
}
