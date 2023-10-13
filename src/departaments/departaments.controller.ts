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
import { DepartamentsService } from './departaments.service';
import { CreateDepartamentDto } from './dto/create-departament.dto';
import { UpdateDepartamentDto } from './dto/update-departament.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('departaments')
export class DepartamentsController {
  constructor(private readonly departamentsService: DepartamentsService) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createDepartamentDto: CreateDepartamentDto) {
    return this.departamentsService.create(createDepartamentDto);
  }

  @Get()
  findAll() {
    return this.departamentsService.findAll();
  }

  @Roles(Role.Coordinator)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departamentsService.findOne(id);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartamentDto: UpdateDepartamentDto,
  ) {
    return this.departamentsService.update(id, updateDepartamentDto);
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departamentsService.remove(+id);
  }
}
