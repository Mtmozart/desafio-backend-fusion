import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { dataSourceConfig } from './database/data-source';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { PlanetModule } from './modules/planet/planet.module';

@Module({
  imports: [
   TypeOrmModule.forRoot(dataSourceConfig() as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    PlanetModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

