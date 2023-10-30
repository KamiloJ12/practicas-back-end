import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    // if (user.role != Role.Student)
    //   throw new UnauthorizedException('The user is not a student');
    const student = this.studentsRepository.create(createStudentDto);
    return await this.studentsRepository.save(student);
  }

  async findAll() {
    return await this.studentsRepository.find();
  }

  async findOne(id: number) {
    return await this.studentsRepository.findOne({
      where: { id },
      relations: [
        'residenceDepartament',
        'residenceMunicipality',
        'healthCareCompanyEnrollment',
        'healthCareCompanyEnrollment.healthCareCompany',
        'programmingLanguages',
        'frameworks',
        'developmentArea',
        'identityDocument',
        'identityDocument.documentType',
      ],
    });
  }

  async findOneByUserId(userId: number) {
    return await this.studentsRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return await this.studentsRepository.update(id, updateStudentDto);
  }

  async remove(id: number) {
    return await this.studentsRepository.softRemove({ id });
  }
}
