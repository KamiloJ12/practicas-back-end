import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AffiliationTypeService } from './affiliation-type.service';
import { CreateAffiliationTypeDto, UpdateAffiliationTypeDto } from './dto/';
import { Roles, Public } from 'src/auth/decorators';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AffiliationType } from 'src/affiliation-type/entities/affiliation-type.entity';

@Controller('affiliation-type')
export class AffiliationTypeController {
  constructor(
    private readonly affiliationTypeService: AffiliationTypeService,
  ) {}

  /**
   * Crea un nuevo tipo de afiliación.
   * @param createAffiliationTypeDto - Los datos para crear el tipo de afiliación.
   * @returns El tipo de afiliación creado.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Post()
  @UseGuards(JwtAuthGuard) // Protege la ruta con autenticación
  async create(
    @Body() createAffiliationTypeDto: CreateAffiliationTypeDto,
  ): Promise<AffiliationType> {
    return await this.affiliationTypeService.create(createAffiliationTypeDto);
  }

  /**
   * Obtiene una lista de todos los tipos de afiliación.
   * @returns Una lista de tipos de afiliación.
   */
  @Public()
  @Get()
  async findAll(): Promise<AffiliationType[]> {
    return await this.affiliationTypeService.findAll();
  }

  /**
   * Obtiene un tipo de afiliación por su ID.
   * @param id - El ID del tipo de afiliación a recuperar.
   * @returns El tipo de afiliación o un mensaje de error si no se encuentra.
   */
  @Public()
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AffiliationType> {
    return await this.affiliationTypeService.findOne(id);
  }

  /**
   * Actualiza un tipo de afiliación por su ID.
   * @param id - El ID del tipo de afiliación a actualizar.
   * @param updateAffiliationTypeDto - Los datos para actualizar el tipo de afiliación.
   * @returns El tipo de afiliación actualizado o un mensaje de error si no se encuentra.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAffiliationTypeDto: UpdateAffiliationTypeDto,
  ): Promise<AffiliationType> {
    return await this.affiliationTypeService.update(
      id,
      updateAffiliationTypeDto,
    );
  }

  /**
   * Elimina un tipo de afiliación por su ID.
   * @param id - El ID del tipo de afiliación a eliminar.
   * @returns El tipo de afiliación eliminado o un mensaje de error si no se encuentra.
   * @throws Roles(Role.COORDINATOR) - Se requiere el rol de coordinador para acceder.
   */
  @Roles(Role.COORDINATOR)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ id: number } & AffiliationType> {
    return await this.affiliationTypeService.remove(id);
  }
}
