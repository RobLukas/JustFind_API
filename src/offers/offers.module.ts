import { Module } from '@nestjs/common';
import OffersService from './offers.service';
import OffersController from './offers.controller';

@Module({
  imports: [],
  controllers: [OffersController],
  providers: [OffersService],
})
export default class OffersModule {}
