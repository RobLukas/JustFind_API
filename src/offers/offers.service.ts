import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateOfferDto from './dto/createOffer.dto';
import UpdateOfferDto from './dto/updateOffer.dto';

@Injectable()
export default class OffersService {
  getAllOffers() {}
}
