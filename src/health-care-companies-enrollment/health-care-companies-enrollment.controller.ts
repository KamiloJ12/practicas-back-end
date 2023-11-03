import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { HealthCareCompaniesEnrollmentService } from './health-care-companies-enrollment.service';
import { CreateHealthCareCompaniesEnrollmentDto } from './dto/create-health-care-companies-enrollment.dto';
import { UpdateHealthCareCompaniesEnrollmentDto } from './dto/update-health-care-companies-enrollment.dto';
import { Roles } from 'src/auth/decorators';
import { Role } from 'src/auth/enums/role.enum';

@Controller('health-care-companies-enrollment')
export class HealthCareCompaniesEnrollmentController {
  constructor(
    private readonly healthCareCompaniesEnrollmentService: HealthCareCompaniesEnrollmentService,
  ) {}

  @Roles(Role.COORDINATOR)
  @Post()
  create(
    @Body()
    createHealthCareCompaniesEnrollmentDto: CreateHealthCareCompaniesEnrollmentDto,
  ) {
    return this.healthCareCompaniesEnrollmentService.create(
      createHealthCareCompaniesEnrollmentDto,
    );
  }

  @Roles(Role.COORDINATOR)
  @Get()
  findAll() {
    return this.healthCareCompaniesEnrollmentService.findAll();
  }

  @Roles(Role.COORDINATOR)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.healthCareCompaniesEnrollmentService.findOne(id);
  }

  @Roles(Role.COORDINATOR)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateHealthCareCompaniesEnrollmentDto: UpdateHealthCareCompaniesEnrollmentDto,
  ) {
    return this.healthCareCompaniesEnrollmentService.update(
      id,
      updateHealthCareCompaniesEnrollmentDto,
    );
  }

  @Roles(Role.COORDINATOR)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.healthCareCompaniesEnrollmentService.remove(id);
  }
}
