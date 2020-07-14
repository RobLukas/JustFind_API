import { Module } from '@nestjs/common';
import OfficesService from './offices.service';
import OfficesController from './offices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Offices from './offices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offices])],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export default class OfficesModule {}
