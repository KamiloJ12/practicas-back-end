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
import { DevelopmentAreasService } from './development_areas.service';
import { CreateDevelopmentAreaDto } from './dto/create-development_area.dto';
import { UpdateDevelopmentAreaDto } from './dto/update-development_area.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('development-areas')
export class DevelopmentAreasController {
  constructor(
    private readonly developmentAreasService: DevelopmentAreasService,
  ) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createDevelopmentAreaDto: CreateDevelopmentAreaDto) {
    return this.developmentAreasService.create(createDevelopmentAreaDto);
  }

  @Roles(Role.Coordinator)
  @Get()
  findAll() {
    return this.developmentAreasService.findAll();
  }

  @Roles(Role.Coordinator)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.developmentAreasService.findOne(id);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDevelopmentAreaDto: UpdateDevelopmentAreaDto,
  ) {
    return this.developmentAreasService.update(id, updateDevelopmentAreaDto);
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.developmentAreasService.remove(id);
  }
}
