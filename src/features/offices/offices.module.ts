import { Module, HttpModule } from '@nestjs/common';
import OfficesService from './offices.service';
import OfficesController from './offices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Offices from './offices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offices]), HttpModule],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export default class OfficesModule {}
