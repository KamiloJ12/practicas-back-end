import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProgrammingLanguagesService } from './programming-languages.service';
import { CreateProgrammingLanguageDto } from './dto/create-programming-language.dto';
import { UpdateProgrammingLanguageDto } from './dto/update-programming-language.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('programming-languages')
export class ProgrammingLanguagesController {
  constructor(
    private readonly programmingLanguagesService: ProgrammingLanguagesService,
  ) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createProgrammingLanguageDto: CreateProgrammingLanguageDto) {
    return this.programmingLanguagesService.create(
      createProgrammingLanguageDto,
    );
  }

  @Get()
  findAll() {
    return this.programmingLanguagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programmingLanguagesService.findOne(+id);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgrammingLanguageDto: UpdateProgrammingLanguageDto,
  ) {
    return this.programmingLanguagesService.update(
      +id,
      updateProgrammingLanguageDto,
    );
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programmingLanguagesService.remove(+id);
  }
}
