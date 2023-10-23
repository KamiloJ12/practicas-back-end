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
import { HealthCareCompaniesService } from './health-care-companies.service';
import { CreateHealthCareCompanyDto } from './dto/create-health-care-company.dto';
import { UpdateHealthCareCompanyDto } from './dto/update-health-care-company.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('health-care-companies')
export class HealthCareCompaniesController {
  constructor(
    private readonly healthCareCompaniesService: HealthCareCompaniesService,
  ) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createHealthCareCompanyDto: CreateHealthCareCompanyDto) {
    return this.healthCareCompaniesService.create(createHealthCareCompanyDto);
  }

  @Get()
  findAll() {
    return this.healthCareCompaniesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.healthCareCompaniesService.findOne(id);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHealthCareCompanyDto: UpdateHealthCareCompanyDto,
  ) {
    return this.healthCareCompaniesService.update(
      id,
      updateHealthCareCompanyDto,
    );
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.healthCareCompaniesService.remove(id);
  }
}
