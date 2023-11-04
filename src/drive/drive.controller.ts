import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { DriveService } from './drive.service';

@Controller('drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @Get('/file/:fileId')
  async getFile(@Param('fileId') fileId: string, @Res() res: Response) {
    try {
      const fileStream = await this.driveService.getFileFromDrive(fileId);

      // Puedes definir el tipo de respuesta según el tipo de archivo (por ejemplo, 'image/jpeg' para una imagen)
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=archivo-descargado',
      );
      console.log(fileStream);
      // Devuelve el contenido del archivo como una respuesta HTTP
      res.send(fileStream);
    } catch (error) {
      throw new NotFoundException(
        'El archivo no se pudo encontrar en Google Drive',
      );
    }
  }
}
