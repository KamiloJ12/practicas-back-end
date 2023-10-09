import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firtName: string; // Nombres

  @Column()
  lastName: string; // Apellidos

  @Column()
  studentCode: number; // Codigo

  classSchedule: any; // horario de clase -> documento

  @Column()
  gender: string;

  @Column()
  address: string; // dirección

  @Column()
  phoneNumber: number; // dirección de telefono

  @Column()
  currentSemester: number; // semetre actual

  resumeDocumentFile: string; // hoja de vida -> documento

  status: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
