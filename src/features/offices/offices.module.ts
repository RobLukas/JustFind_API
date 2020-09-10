import { Module, HttpModule } from '@nestjs/common';
import OfficesService from './offices.service';
import OfficesController from './offices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Offices from './offices.entity';
import { ConfigModule } from '@nestjs/config';
import GeoCodeApiService from './geoCodeApi.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offices]), HttpModule, ConfigModule],
  controllers: [OfficesController],
  providers: [OfficesService, GeoCodeApiService],
})
export default class OfficesModule {}
