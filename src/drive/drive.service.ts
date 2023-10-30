import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class DriveService {
  private drive: any;
  constructor(private configService: ConfigService) {
    const CLIENT_ID: string = this.configService.get('CLIENT_ID');
    const CLIENT_SECRET: string = this.configService.get('CLIENT_SECRET');
    const REDIRECT_URI: string = this.configService.get('REDIRECT_URI');
    const REFRESH_TOKEN: string = this.configService.get('REFRESH_TOKEN');

    const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    auth.setCredentials({ refresh_token: REFRESH_TOKEN });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async createFile(fileMetadata: any, media: any): Promise<string> {
    try {
      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
      });

      return response.data.id;
    } catch (error) {
      throw new Error(
        `Error al crear el archivo en Google Drive: ${error.message}`,
      );
    }
  }

  async searchFiles(query: string): Promise<any[]> {
    try {
      const response = await this.drive.files.list({
        q: query,
      });

      return response.data.files;
    } catch (error) {
      throw new Error(
        `Error al buscar archivos en Google Drive: ${error.message}`,
      );
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });
    } catch (error) {
      throw new Error(
        `Error al eliminar el archivo en Google Drive: ${error.message}`,
      );
    }
  }

  async createFolder(folderName: string, parentFolderId: string) {
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
      throw new Error(
        `Error al crear la carpeta en Google Drive: ${error.message}`,
      );
    }
  }

  async searchFolders(folderName: string, parentFolderId: string) {
    try {
      const response = await this.drive.files.list({
        q: `'${parentFolderId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
      });
      return response.data.files;
    } catch (error) {
      throw new Error(
        `Error al buscar carpetas en Google Drive: ${error.message}`,
      );
    }
  }
}
