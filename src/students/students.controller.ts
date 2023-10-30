import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { StudentsService } from './students.service';
// import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { DriveService } from 'src/drive/drive.service';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';
import { IdentityDocumentsService } from '../identity-documents/identity-documents.service';
import { CreateIdentityDocumentDto } from '../identity-documents/dto/create-identity-document.dto';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly driveService: DriveService,
    private readonly configService: ConfigService,
    private readonly identityDocumentsService: IdentityDocumentsService,
  ) {}

    /*
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'resumeDocumentFile', maxCount: 1 },
      { name: 'pictureFile', maxCount: 1 },
      { name: 'documentFile', maxCount: 1 },
      { name: 'classScheduleFile', maxCount: 1 },
      { name: 'documentHealthFile', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      resumeDocumentFile?: Express.Multer.File[];
      pictureFile?: Express.Multer.File[];
      documentFile?: Express.Multer.File[];
      classScheduleFile?: Express.Multer.File[]; 
      documentHealthFile?: Express.Multer.File[];
    },
    @Req() req,
    @Body() createStudentDto,
  )

  */

  @Post()
  @UseInterceptors(
    FilesInterceptor('resumeDocumentFile', 1),
    FilesInterceptor('pictureFile', 1),
    FilesInterceptor('documentFile', 1),
    FilesInterceptor('classScheduleFile', 1),
    FilesInterceptor('documentHealthFile', 1),
  )
  async create(@UploadedFiles() files, @Req() req, @Body() createStudentDto) {
    console.log(createStudentDto);
    console.log(files);
    /* const folderRootId = this.configService.get('FOLDER_ID_STUDENT_REGISTER');
    const folderSemesterId = await this.getSemesterFolderId(folderRootId);

    const folderStudentName = `${createStudentDto.firstName} ${createStudentDto.lastName}`;
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
    const pictureFileFileId = await this.uploadFileToStudentFolder(
      pictureFile,
      folderStudentId,
    );

    console.log('---------DRIVE---------');
    console.log({
      folderSemesterId,
      folderStudentId,
      resumeDocumentFileId,
      pictureFileFileId,
    });

    createStudentDto.user = req.user;
    createStudentDto.resumeDocumentFile = resumeDocumentFileId;
    createStudentDto.pictureFile = pictureFileFileId;
    return this.studentsService.create(createStudentDto); */
  }

  @Patch('/identity-document')
  @UseInterceptors(FileInterceptor('documentFile'))
  async addIdentityDocumnet(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createIdentityDocumentDto: CreateIdentityDocumentDto,
  ) {
    const student = await this.studentsService.findOneByUserId(req.user.id);

    const folderRootId = this.configService.get('FOLDER_ID_STUDENT_REGISTER');
    const folderSemesterId = await this.getSemesterFolderId(folderRootId);

    const folderStudentName = `${student.firstName} ${student.lastName}`;
    const folderStudentId = await this.getStudentFolderId(
      folderStudentName,
      folderSemesterId,
    );

    const documentFileId = await this.uploadFileToStudentFolder(
      file,
      folderStudentId,
    );

    createIdentityDocumentDto.documentFile = documentFileId;
    const identityDocument = await this.identityDocumentsService.create(
      createIdentityDocumentDto,
    );
    this.studentsService.update(student.id, { identityDocument });
  }

  @Roles(Role.Coordinator)
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Roles(Role.Coordinator)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
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

  //Subir archivo al drive
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
}
