import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { DriveService } from 'src/drive/drive.service';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { IdentityDocumentsService } from 'src/identity-documents/identity-documents.service';
import { HealthCareCompaniesEnrollmentService } from 'src/health-care-companies-enrollment/health-care-companies-enrollment.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    private readonly identityDocumentService: IdentityDocumentsService,
    private readonly healthCareCompanyEnrollmentService: HealthCareCompaniesEnrollmentService,
    private readonly driveService: DriveService,
    private readonly configService: ConfigService,
  ) {}

  async createStudent(
    createStudentDto: CreateStudentDto,
    user: User,
    files: any,
  ) {
    // Sube los archivos relacionados y obtén sus IDs
    const folderRootId = this.configService.get('FOLDER_ID_STUDENT_REGISTER');
    const folderSemesterId = await this.getSemesterFolderId(folderRootId);

    const folderStudentName = `${createStudentDto.firstName} ${createStudentDto.lastName} - ${createStudentDto.studentCode}`;
    const folderStudentId = await this.getStudentFolderId(
      folderStudentName,
      folderSemesterId,
    );

    const resumentFile = files.resumeDocumentFile[0];
    const resumeDocumentFileId = await this.uploadFileToStudentFolder(
      resumentFile,
      folderStudentId,
    );
    const pictureFile = files.pictureFile[0];
    const pictureFileId = await this.uploadFileToStudentFolder(
      pictureFile,
      folderStudentId,
    );
    const documentFile = files.documentFile[0];
    const documentFileId = await this.uploadFileToStudentFolder(
      documentFile,
      folderStudentId,
    );
    const classScheduleFile = files.classScheduleFile[0];
    const classScheduleFileId = await this.uploadFileToStudentFolder(
      classScheduleFile,
      folderStudentId,
    );
    const documentHealthFile = files.documentHealthFile[0];
    const documentHealthFileId = await this.uploadFileToStudentFolder(
      documentHealthFile,
      folderStudentId,
    );

    // Crea y asocia el documento de identidad con el estudiante
    const identityDocument = await this.identityDocumentService.create(
      createStudentDto.identityDocument,
      documentFileId,
    );

    // Crea y asocia la inscripción de empresa de salud con el estudiante
    const healthCareCompanyEnrollment =
      await this.healthCareCompanyEnrollmentService.create(
        createStudentDto.healthCareCompanyEnrollment,
        documentHealthFileId,
      );

    const student = this.studentsRepository.create({
      ...createStudentDto,
      resumeDocumentFile: resumeDocumentFileId,
      pictureFile: pictureFileId,
      classScheduleFile: classScheduleFileId,
      identityDocument: identityDocument,
      healthCareCompanyEnrollment: healthCareCompanyEnrollment,
      user,
    });
    return await this.studentsRepository.save(student);
  }

  // Crear carpeta del semestre
  async getSemesterFolderId(rootFolderId: string) {
    // Obtener la fecha actual o la fecha de registro del estudiante
    const currentDate = new Date();

    // Determinar el semestre en función de la fecha (Enero a Junio o Julio a Diciembre)
    const semester = currentDate.getMonth() < 6 ? 'I' : 'II';
    const year = currentDate.getFullYear();

    // Crear la estructura de carpetas
    const folderName = `Practicas-${semester}-SEM-${year}`;

    try {
      const semesterFolder = await this.driveService.searchFolders(
        folderName,
        rootFolderId,
      );
      return semesterFolder[0].id;
    } catch (error) {
      return await this.driveService.createFolder(folderName, rootFolderId);
    }
  }

  //Crear carpeta de estudiante
  async getStudentFolderId(folderName: string, rootFolderId: string) {
    try {
      const semesterFolder = await this.driveService.searchFolders(
        folderName,
        rootFolderId,
      );
      return semesterFolder[0].id;
    } catch (error) {
      return await this.driveService.createFolder(folderName, rootFolderId);
    }
  }

  async uploadFileToStudentFolder(
    file: Express.Multer.File,
    studentFolderId: string,
  ) {
    const fileMetadata = {
      name: file.originalname,
      parents: [studentFolderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };

    return this.driveService.createFile(fileMetadata, media);
  }

  async create(createStudentDto: CreateStudentDto) {
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
