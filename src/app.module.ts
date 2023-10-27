import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';
import { DepartamentsModule } from './departaments/departments.module';
import { DevelopmentAreasModule } from './development_areas/development_areas.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { EmailModule } from './email/email.module';
import { FrameworksModule } from './frameworks/frameworks.module';
import { HealthCareCompaniesEnrollmentModule } from './health-care-companies-enrollment/health-care-companies-enrollment.module';
import { HealthCareCompaniesModule } from './health-care-companies/health-care-companies.module';
import { IdentityDocumentsModule } from './identity-documents/identity-documents.module';
import { MunicipalitiesModule } from './municipalities/municipalities.module';
import { ProgrammingLanguagesModule } from './programming-languages/programming-languages.module';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';
import { AffiliationTypeModule } from './affiliation-type/affiliation-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3000,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_SSL === 'true',
      extra: {
        ssl:
          process.env.DB_SSL === 'true'
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    EmailConfirmationModule,
    StudentsModule,
    DocumentTypeModule,
    IdentityDocumentsModule,
    CountriesModule,
    DepartamentsModule,
    MunicipalitiesModule,
    HealthCareCompaniesModule,
    HealthCareCompaniesEnrollmentModule,
    FrameworksModule,
    ProgrammingLanguagesModule,
    DevelopmentAreasModule,
    AffiliationTypeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
