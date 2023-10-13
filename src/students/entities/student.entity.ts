import { User } from 'src/users/entities/user.entity';
import { IdentityDocument } from '../../identity-documents/entities/identity-document.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firtName: string; // Nombres

  @Column()
  lastName: string; // Apellidos

  @Column({ unique: true })
  studentCode: number; // Codigo

  @Column()
  classSchedule: string; // horario de clase -> documento

  @Column()
  gender: string;

  @Column()
  address: string; // dirección

  @Column({ type: 'bigint' })
  phoneNumber: number; // dirección de telefono

  @Column()
  currentSemester: number; // semetre actual

  @Column()
  resumeDocumentFile: string; // hoja de vida -> documento

  @Column()
  status: string;

  @OneToOne(() => IdentityDocument, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  identityDocument: IdentityDocument;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user: User;

  @DeleteDateColumn()
  deletedAt: Date;
}
