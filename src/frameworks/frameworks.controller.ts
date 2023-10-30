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
import { FrameworksService } from './frameworks.service';
import { CreateFrameworkDto } from './dto/create-framework.dto';
import { UpdateFrameworkDto } from './dto/update-framework.dto';
import { Roles, Public } from 'src/auth/decorators';
import { Role } from 'src/auth/enums/role.enum';

@Controller('frameworks')
export class FrameworksController {
  constructor(private readonly frameworksService: FrameworksService) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createFrameworkDto: CreateFrameworkDto) {
    return this.frameworksService.create(createFrameworkDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.frameworksService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.frameworksService.findOne(id);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFrameworkDto: UpdateFrameworkDto,
  ) {
    return this.frameworksService.update(id, updateFrameworkDto);
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.frameworksService.remove(id);
  }
}
