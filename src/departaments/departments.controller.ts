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
import { DepartmentsService } from './departments.service';

import { CreateDepartmentDto, UpdateDepartmentDto } from './dto';

import { Roles, Public } from 'src/auth/decorators';
import { Role } from 'src/auth/enums/role.enum';

@Controller('departments')
export class DepartamentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findOne(id);
  }

  @Public()
  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.departmentsService.findByName(name);
  }

  @Public()
  @Get('byCountry/:countryId')
  findByCountry(@Param('countryId', ParseIntPipe) countryId: number) {
    return this.departmentsService.findByCountry(countryId);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.remove(+id);
  }
}
