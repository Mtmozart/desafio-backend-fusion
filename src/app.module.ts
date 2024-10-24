import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { dataSourceConfig } from './database/data-source';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { PlanetModule } from './modules/planet/planet.module';
import { GalaxyModule } from './modules/galaxy/galaxy.module';
import { SystemModule } from './modules/system/system.module';
import { ShipModule } from './modules/ship/ship.module';

@Module({
  imports: [
   TypeOrmModule.forRoot(dataSourceConfig() as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    PlanetModule,
    GalaxyModule,
    SystemModule,
    ShipModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

