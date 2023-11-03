import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class DriveService {
  private drive: any;

  constructor(private configService: ConfigService) {
    this.setupGoogleDrive();
  }

  private setupGoogleDrive() {
    const CLIENT_ID: string = this.configService.get('CLIENT_ID');
    const CLIENT_SECRET: string = this.configService.get('CLIENT_SECRET');
    const REDIRECT_URI: string = this.configService.get('REDIRECT_URI');
    const REFRESH_TOKEN: string = this.configService.get('REFRESH_TOKEN');

    const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    auth.setCredentials({ refresh_token: REFRESH_TOKEN });
    this.drive = google.drive({ version: 'v3', auth });
  }

  /**
   * Crea un archivo en Google Drive.
   * @param fileMetadata Metadatos del archivo.
   * @param media Contenido del archivo.
   * @returns ID del archivo creado.
   */
  async createFile(fileMetadata: any, media: any): Promise<string> {
    try {
      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
      });

      return response.data.id;
    } catch (error) {
      console.error(
        `Error al crear el archivo en Google Drive: ${error.message}`,
      );
      throw new Error('No se pudo crear el archivo en Google Drive.');
    }
  }

  /**
   * Busca archivos en Google Drive.
   * @param query Consulta de búsqueda.
   * @returns Lista de archivos que coinciden con la consulta.
   */
  async searchFiles(query: string): Promise<any[]> {
    try {
      const response = await this.drive.files.list({
        q: query,
      });

      return response.data.files;
    } catch (error) {
      console.error(
        `Error al buscar archivos en Google Drive: ${error.message}`,
      );
      throw new Error('No se pudo realizar la búsqueda en Google Drive.');
    }
  }

  /**
   * Elimina un archivo en Google Drive.
   * @param fileId ID del archivo a eliminar.
   */
  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });
    } catch (error) {
      console.error(
        `Error al eliminar el archivo en Google Drive: ${error.message}`,
      );
      throw new Error('No se pudo eliminar el archivo en Google Drive.');
    }
  }

  /**
   * Crea una carpeta en Google Drive.
   * @param folderName Nombre de la carpeta a crear.
   * @param parentFolderId ID de la carpeta principal.
   * @returns ID de la carpeta creada.
   */
  async createFolder(
    folderName: string,
    parentFolderId: string,
  ): Promise<string> {
    try {
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId],
      };

      const response = await this.drive.files.create({
        resource: folderMetadata,
      });

      return response.data.id;
    } catch (error) {
      console.error(
        `Error al crear la carpeta en Google Drive: ${error.message}`,
      );
      throw new Error('No se pudo crear la carpeta en Google Drive.');
    }
  }

  /**
   * Busca carpetas en Google Drive.
   * @param folderName Nombre de la carpeta a buscar.
   * @param parentFolderId ID de la carpeta principal.
   * @returns Lista de carpetas que coinciden con la búsqueda.
   */
  async searchFolders(
    folderName: string,
    parentFolderId: string,
  ): Promise<any[]> {
    try {
      const response = await this.drive.files.list({
        q: `'${parentFolderId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
      });
      return response.data.files;
    } catch (error) {
      console.error(
        `Error al buscar carpetas en Google Drive: ${error.message}`,
      );
      throw new Error(
        'No se pudo realizar la búsqueda de carpetas en Google Drive.',
      );
    }
  }
}
