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
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/auth/enums/role.enum';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

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
    @UploadedFiles() files,
    @Req() req,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return await this.studentsService.createStudent(
      createStudentDto,
      req.user,
      files,
    );
  }

  @Roles(Role.COORDINATOR)
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Roles(Role.COORDINATOR)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Roles(Role.COORDINATOR)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Roles(Role.COORDINATOR)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }
}
