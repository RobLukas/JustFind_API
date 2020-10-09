import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import GeoCodeApiService from 'geoCodeApi/geoCodeApi.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GeoCodeApiService],
  exports: [GeoCodeApiService],
})
export default class GeoCodeApiModule {}
