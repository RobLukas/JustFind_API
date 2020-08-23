import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Offers from './offers.entity';
import QueryOfferDto from './dto/queryOffer.dto';
import OfferNotFound from './exception/offersNotFound.exception';
import CreateOfferDto from './dto/createOffer.dto';
import OfferAlreadyExists from './exception/offersAlreadyExists.exception';
import UpdateOfferDto from './dto/updateOffer.dto';
import slugify from 'utils/slugify';
import Companies from 'companies/companies.entity';
import CompanyNotFound from 'companies/exception/companyNotFound.exception';

@Injectable()
export default class OffersService {
  constructor(
    @InjectRepository(Offers)
    private offersRepository: Repository<Offers>,
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
  ) {}
  async getAllOffers(query: QueryOfferDto) {
    const { limit, offset, ...entities } = query;
    const [offers, count] = await this.offersRepository.findAndCount({
      where: entities,
      take: limit,
      skip: offset,
    });

    return {
      count,
      limit,
      offset,
      data: offers,
    };
  }

  async getOffersById(id: string) {
    const offers = await this.offersRepository.findOne(id);
    if (offers) {
      return offers;
    }
    throw new OfferNotFound(id);
  }

  async createOffer(offer: CreateOfferDto) {
    const { title, companyId } = offer;
    const offerExists = await this.offersRepository.findOne({
      companyId,
      title,
    });
    if (offerExists) {
      throw new OfferAlreadyExists();
    }
    const getCompany = await this.companiesRepository.findOne({
      id: companyId,
    });
    if (!getCompany) {
      throw new CompanyNotFound(companyId);
    }
    const newOffer = await this.offersRepository.create(offer);
    newOffer.slug = slugify(`${getCompany.name} ${newOffer.title}`);
    await this.offersRepository.save(newOffer);
    return newOffer;
  }

  async updateOffer(id: string, offer: UpdateOfferDto) {
    const updatedOffer = await this.offersRepository.save({ id, ...offer });
    if (updatedOffer) {
      return updatedOffer;
    }
    throw new OfferNotFound(id);
  }

  async deleteOfferById(id: string) {
    const deleteResponse = await this.offersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new OfferNotFound(id);
    }
    return 'Offer deleted';
  }
}
