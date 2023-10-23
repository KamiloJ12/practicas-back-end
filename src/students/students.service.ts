import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto, user: User) {
    if (user.role != Role.Student)
      throw new UnauthorizedException('The user is not a student');
    const student = this.studentsRepository.create({
      ...createStudentDto,
      user,
    });
    return this.studentsRepository.save(student);
  }

  findAll() {
    return this.studentsRepository.find();
  }

  findOne(id: number) {
    return this.studentsRepository.findOne({
      where: { id },
      relations: [
        'residenceDepartament',
        'residenceMunicipality',
        'healthCareCompanyEnrollment',
        'healthCareCompanyEnrollment.healthCareCompany',
        'programmingLanguages',
        'frameworks',
        'developmentArea',
      ],
    });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentsRepository.update(id, updateStudentDto);
  }

  remove(id: number) {
    return this.studentsRepository.softRemove({ id });
  }
}
