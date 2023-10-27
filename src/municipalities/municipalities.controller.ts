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
import { MunicipalitiesService } from './municipalities.service';

import { CreateMunicipalityDto, UpdateMunicipalityDto } from './dto';

import { Roles, Public } from 'src/auth/decorators';
import { Role } from 'src/auth/enums/role.enum';

@Controller('municipalities')
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createMunicipalityDto: CreateMunicipalityDto) {
    return this.municipalitiesService.create(createMunicipalityDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.municipalitiesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.municipalitiesService.findOne(id);
  }

  @Public()
  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.municipalitiesService.findByName(name);
  }

  @Public()
  @Get('byDepartment/:departmentId')
  findByDepartment(@Param('departmentId', ParseIntPipe) departmentId: number) {
    return this.municipalitiesService.findByDepartment(departmentId);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMunicipalityDto: UpdateMunicipalityDto,
  ) {
    return this.municipalitiesService.update(id, updateMunicipalityDto);
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.municipalitiesService.remove(+id);
  }
}
