import { Injectable } from '@nestjs/common';
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
import CompanyNotFound from 'features/companies/exception/companyNotFound.exception';
import GetAllDataResponse from 'utils/dto/getAllDataResponse.dto';

@Injectable()
export default class OffersService {
  constructor(
    @InjectRepository(Offers)
    private offersRepository: Repository<Offers>,
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
  ) {}
  async getAllOffers(
    query: QueryOfferDto,
  ): Promise<GetAllDataResponse<Offers>> {
    const { limit, offset, ...entities } = query;
    const [offers, count] = await this.offersRepository.findAndCount({
      relations: ['company'],
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
    const offers = await this.offersRepository.findOne(id, {
      relations: ['company'],
    });
    if (!offers) {
      throw new OfferNotFound(id);
    }
    return offers;
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
    const newOffer = this.offersRepository.create(offer);
    newOffer.slug = slugify(`${getCompany.name} ${newOffer.title}`);
    const createdOffer = await this.offersRepository.save(newOffer);
    return createdOffer;
  }

  async updateOffer(id: string, updateOffer: UpdateOfferDto) {
    const offer = await this.offersRepository.findOne(id);

    if (!offer) {
      throw new OfferNotFound(id);
    }

    const newOffer = this.offersRepository.create({ ...offer, ...updateOffer });
    const updatedOffer = await this.offersRepository.save(newOffer);
    return updatedOffer;
  }

  async deleteOfferById(id: string) {
    const deleteResponse = await this.offersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new OfferNotFound(id);
    }
    return 'Offer deleted';
  }
}
