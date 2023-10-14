import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthCareCompaniesEnrollmentService } from './health-care-companies-enrollment.service';
import { CreateHealthCareCompaniesEnrollmentDto } from './dto/create-health-care-companies-enrollment.dto';
import { UpdateHealthCareCompaniesEnrollmentDto } from './dto/update-health-care-companies-enrollment.dto';

@Controller('health-care-companies-enrollment')
export class HealthCareCompaniesEnrollmentController {
  constructor(private readonly healthCareCompaniesEnrollmentService: HealthCareCompaniesEnrollmentService) {}

  @Post()
  create(@Body() createHealthCareCompaniesEnrollmentDto: CreateHealthCareCompaniesEnrollmentDto) {
    return this.healthCareCompaniesEnrollmentService.create(createHealthCareCompaniesEnrollmentDto);
  }

  @Get()
  findAll() {
    return this.healthCareCompaniesEnrollmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthCareCompaniesEnrollmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthCareCompaniesEnrollmentDto: UpdateHealthCareCompaniesEnrollmentDto) {
    return this.healthCareCompaniesEnrollmentService.update(+id, updateHealthCareCompaniesEnrollmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthCareCompaniesEnrollmentService.remove(+id);
  }
}
