import { Module } from '@nestjs/common';
import OffersService from './offers.service';
import OffersController from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Offers from './offers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offers])],
  controllers: [OffersController],
  providers: [OffersService],
})
export default class OffersModule {}
