import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import CreateOfferDto from './dto/createOffer.dto';
import UpdateOfferDto from './dto/updateOffer.dto';
import OffersService from './offers.service';
import QueryOfferDto from './dto/queryOffer.dto';
import UUIDParams from 'utils/uuidParams';

@Controller('offers')
export default class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  getAllOffers(@Query() query: QueryOfferDto) {
    return this.offersService.getAllOffers(query);
  }

  @Get(':id')
  getOfferById(@Param() { id }: UUIDParams) {
    return this.offersService.getOffersById(id);
  }

  @Post()
  createOffer(@Body() offer: CreateOfferDto) {
    return this.offersService.createOffer(offer);
  }

  @Patch(':id')
  modifyOffer(@Param() { id }: UUIDParams, @Body() offer: UpdateOfferDto) {
    return this.offersService.updateOffer(id, offer);
  }

  @Delete(':id')
  deleteOffer(@Param() { id }: UUIDParams) {
    return this.offersService.deleteOfferById(id);
  }
}
