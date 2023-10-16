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
import { MunicipalitiesService } from './municipalities.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('municipalities')
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createMunicipalityDto: CreateMunicipalityDto) {
    return this.municipalitiesService.create(createMunicipalityDto);
  }

  @Get()
  findAll() {
    return this.municipalitiesService.findAll();
  }

  @Get('suggestion')
  getSuggestions(
    @Query('name') name: string,
    @Query('department') department: string,
  ) {
    console.log(department);
    return this.municipalitiesService.getSuggestions(name, department);
  }

  @Roles(Role.Coordinator)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.municipalitiesService.findOne(id);
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
