import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateOfferDto from './dto/createOffer.dto';
import UpdateOfferDto from './dto/updateOffer.dto';
import Offers from './offers.entity';

@Injectable()
export default class OffersService {
  constructor(
    @InjectRepository(Offers)
    private offersRepository: Repository<Offers>,
  ) {}
  getAllOffers() {
    return this.offersRepository.find();
  }
  
}
