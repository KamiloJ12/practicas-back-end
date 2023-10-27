import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AffiliationTypeService } from './affiliation-type.service';
import { CreateAffiliationTypeDto, UpdateAffiliationTypeDto } from './dto';
import { Roles, Public } from 'src/auth/decorators';
import { Role } from 'src/auth/enums/role.enum';

@Controller('affiliation-type')
export class AffiliationTypeController {
  constructor(
    private readonly affiliationTypeService: AffiliationTypeService,
  ) {}

  @Roles(Role.Coordinator)
  @Post()
  create(@Body() createAffiliationTypeDto: CreateAffiliationTypeDto) {
    return this.affiliationTypeService.create(createAffiliationTypeDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.affiliationTypeService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliationTypeService.findOne(+id);
  }

  @Roles(Role.Coordinator)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAffiliationTypeDto: UpdateAffiliationTypeDto,
  ) {
    return this.affiliationTypeService.update(+id, updateAffiliationTypeDto);
  }

  @Roles(Role.Coordinator)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliationTypeService.remove(+id);
  }
}
