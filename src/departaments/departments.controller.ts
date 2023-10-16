import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('departments')
export class DepartamentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get('suggestion')
  getSuggestions(
    @Query('name') name: string,
    @Query('country') country: string,
  ) {
    return this.departmentsService.getSuggestions(name, country);
  }

  @Roles(Role.Coordinator)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findOne(id);
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
