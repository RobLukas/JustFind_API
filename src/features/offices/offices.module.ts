import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import OfficesService from './offices.service';
import OfficesController from './offices.controller';
import Offices from './offices.entity';
import GeoCodeApiModule from 'geoCodeApi/geoCodeApi.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offices]), GeoCodeApiModule],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export default class OfficesModule {}
