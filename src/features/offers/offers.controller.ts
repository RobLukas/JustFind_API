import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import CreateOfferDto from './dto/createOffer.dto';
import UpdateOfferDto from './dto/updateOffer.dto';
import OffersService from './offers.service';

@Controller('offers')
export default class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  getAllOffers() {
    return this.offersService.getAllOffers();
  }

  @Get(':id')
  getOfferById(@Param('id') id: string) {
    return 'get by id';
  }

  @Post()
  createOffer(@Body() offer: CreateOfferDto) {
    return 'asd';
  }

  @Put(':id')
  modifyOffer(@Param('id') id: string, @Body() offer: UpdateOfferDto) {
    return 'asd';
  }

  @Delete(':id')
  deleteOffer(@Param('id') id: string) {
    return 'asd';
  }

  @Delete()
  deleteAllOffers() {}
}
