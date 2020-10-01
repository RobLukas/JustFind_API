import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from 'faker';

import Companies from 'companies/companies.entity';
import { CompanyMockFactory } from 'companies/__mocks__/company.factory';
import CompanyNotFound from 'features/companies/exception/companyNotFound.exception';
import {
  MockType,
  repositoryMockFactory,
} from 'features/__mocks__/repository.factory';
import CreateOfferDto from '../dto/createOffer.dto';
import QueryOfferDto from '../dto/queryOffer.dto';
import UpdateOfferDto from '../dto/updateOffer.dto';
import OfferAlreadyExists from '../exception/offersAlreadyExists.exception';
import OfferNotFound from '../exception/offersNotFound.exception';
import OffersController from '../offers.controller';
import Offers from '../offers.entity';
import OffersService from '../offers.service';
import { OffersMockFactory } from '../__mocks__/offers.factory';

describe('OffersService', () => {
  let offersService: OffersService;
  let repositoryMockOffers: MockType<Repository<Offers>>;
  let repositoryMockCompanies: MockType<Repository<Companies>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [
        OffersService,
        {
          provide: getRepositoryToken(Offers),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Companies),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    offersService = moduleRef.get<OffersService>(OffersService);
    repositoryMockOffers = moduleRef.get<MockType<Repository<Offers>>>(
      getRepositoryToken(Offers),
    );
    repositoryMockCompanies = moduleRef.get<MockType<Repository<Companies>>>(
      getRepositoryToken(Companies),
    );
  });
  describe('getAllOffers', () => {
    const query = new QueryOfferDto();
    const { limit, offset, ...entities } = query;
    const offerRelations = { relations: ['company'] };
    it('should return an array of offers', async () => {
      const countOfOffers = 10;
      const companies = CompanyMockFactory.build();
      const offers = OffersMockFactory.buildList(countOfOffers, {
        companyId: companies.id,
      });

      repositoryMockOffers.findAndCount.mockReturnValue(
        Promise.resolve([offers, countOfOffers]),
      );
      const fetchedOffers = await offersService.getAllOffers(query);

      expect(fetchedOffers).toEqual({
        count: countOfOffers,
        data: offers,
      });
      expect(repositoryMockOffers.findAndCount).toHaveBeenCalledWith({
        ...offerRelations,
        where: entities,
        take: limit,
        skip: offset,
      });
    });
    it('should return an empty array of offers', async () => {
      const offers: Offers[] = [];
      const countOfOffers = 0;

      repositoryMockOffers.findAndCount.mockReturnValue(
        Promise.resolve([offers, countOfOffers]),
      );

      const fetchedOffers = await offersService.getAllOffers(query);

      expect(fetchedOffers).toEqual({
        count: countOfOffers,
        data: offers,
      });
      expect(repositoryMockOffers.findAndCount).toHaveBeenCalledWith({
        where: entities,
        take: limit,
        skip: offset,
        ...offerRelations,
      });
    });
  });
  describe('getOffersById', () => {
    const company = CompanyMockFactory.build();
    const offer = OffersMockFactory.build({ companyId: company.id });
    const { id } = offer;
    const offerRelations = { relations: ['company'] };
    it('should return an object of offer by id', async () => {
      repositoryMockOffers.findOne.mockReturnValue(Promise.resolve(offer));

      const fetchedOffer = await offersService.getOffersById(id);

      expect(fetchedOffer).toEqual(offer);
      expect(repositoryMockOffers.findOne).toHaveBeenCalledWith(
        id,
        offerRelations,
      );
    });
    it('should throw an error "OfferNotFound" when not found an object of offer', async () => {
      repositoryMockOffers.findOne.mockReturnValue(Promise.resolve(undefined));

      await expect(offersService.getOffersById(id)).rejects.toThrow(
        OfferNotFound,
      );
      expect(repositoryMockOffers.findOne).toHaveBeenCalledWith(
        id,
        offerRelations,
      );
    });
  });
  describe('createOffer', () => {
    it('should return an object of offer entity when created', async () => {
      const company = CompanyMockFactory.build();
      const offer = OffersMockFactory.build({ companyId: company.id });

      repositoryMockOffers.findOne.mockReturnValue(Promise.resolve(undefined));
      repositoryMockCompanies.findOne.mockReturnValue(Promise.resolve(company));
      repositoryMockOffers.create.mockReturnValue(offer);
      repositoryMockOffers.save.mockReturnValue(Promise.resolve(offer));

      const offerDto = new CreateOfferDto();
      const { title, companyId } = offerDto;
      const fetchedOffer = await offersService.createOffer(offerDto);

      expect(fetchedOffer).toEqual(offer);
      expect(repositoryMockOffers.findOne).toHaveBeenCalledWith({
        title,
        companyId,
      });
      expect(repositoryMockCompanies.findOne).toHaveBeenCalledWith({
        id: companyId,
      });
      expect(repositoryMockOffers.create).toHaveBeenCalledWith(offerDto);
      expect(repositoryMockOffers.save).toHaveBeenCalledWith(offer);
    });
    it('should throw an error "OfferAlreadyExists" when create similar object of offer', async () => {
      const company = CompanyMockFactory.build();
      const offer = OffersMockFactory.build({ companyId: company.id });
      const offerDto = new CreateOfferDto();
      const { companyId, title } = offerDto;

      repositoryMockOffers.findOne.mockReturnValue(Promise.resolve(offer));

      await expect(offersService.createOffer(offerDto)).rejects.toThrow(
        OfferAlreadyExists,
      );
      expect(repositoryMockOffers.findOne).toHaveBeenCalledWith({
        companyId,
        title,
      });
    });
    it('should throw an error "CompanyNotFound" when not found object of company', async () => {
      const offerDto = new CreateOfferDto();
      const { companyId, title } = offerDto;

      repositoryMockOffers.findOne.mockReturnValue(Promise.resolve(undefined));
      repositoryMockCompanies.findOne.mockReturnValue(
        Promise.resolve(undefined),
      );

      await expect(offersService.createOffer(offerDto)).rejects.toThrow(
        CompanyNotFound,
      );
      expect(repositoryMockOffers.findOne).toHaveBeenCalledWith({
        companyId,
        title,
      });
      expect(repositoryMockCompanies.findOne).toHaveBeenCalledWith({
        id: companyId,
      });
    });
  });
  describe('updateOffer', () => {
    const description = faker.name.jobDescriptor();
    const company = CompanyMockFactory.build();
    const offer = OffersMockFactory.build({ companyId: company.id });
    const { id } = offer;
    it('should return an object of offer entity when updated with correct parameters', async () => {
      const updateOffer = new UpdateOfferDto();
      updateOffer.description = description;

      const newOffer = {
        ...offer,
        ...updateOffer,
      };

      const updatedOffer = { ...newOffer };

      repositoryMockOffers.findOne.mockReturnValue(Promise.resolve(offer));
      repositoryMockOffers.create.mockReturnValue(newOffer);
      repositoryMockOffers.save.mockReturnValue(Promise.resolve(updatedOffer));

      const fetchedOffer = await offersService.updateOffer(id, updateOffer);

      expect(fetchedOffer).toEqual(updatedOffer);
      expect(repositoryMockOffers.findOne).toHaveBeenCalledWith(id);
      expect(repositoryMockOffers.create).toHaveBeenCalledWith({ ...newOffer });
      expect(repositoryMockOffers.save).toHaveBeenCalledWith(updatedOffer);
    });
    it('should throw an error "OfferNotFound" when not found the object of offer', async () => {
      const updateOffer = new UpdateOfferDto();

      repositoryMockOffers.findOne.mockReturnValue(Promise.resolve(undefined));

      await expect(offersService.updateOffer(id, updateOffer)).rejects.toThrow(
        OfferNotFound,
      );
      expect(repositoryMockOffers.findOne).toHaveBeenCalledWith(id);
    });
  });
  describe('deleteOfferById', () => {
    const { id } = OffersMockFactory.build({ companyId: faker.random.uuid() });
    it('should return a string "Offer deleted"', async () => {
      repositoryMockOffers.delete.mockReturnValue(
        Promise.resolve({ affected: 1 }),
      );

      const fetchedOffer = await offersService.deleteOfferById(id);

      expect(fetchedOffer).toEqual('Offer deleted');
      expect(repositoryMockOffers.delete).toHaveBeenCalledWith(id);
    });
    it('should throw an error "OfferNotFound" when not found the object of offer', async () => {
      repositoryMockOffers.delete.mockReturnValue(
        Promise.resolve({ affected: 0 }),
      );

      await expect(offersService.deleteOfferById(id)).rejects.toThrow(
        OfferNotFound,
      );
      expect(repositoryMockOffers.delete).toHaveBeenCalledWith(id);
    });
  });
});
