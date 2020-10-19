import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as faker from 'faker';
import offersServiceMock from 'offers/__mocks__/offers.service.mocks';
import OffersService from 'offers/offers.service';
import OffersMockFactory from 'offers/__factories__/offers.factory';
import QueryOfferDto from 'offers/dto/queryOffer.dto';
import OffersController from 'offers/offers.controller';
import OfferNotFound from '../exception/offersNotFound.exception';
import CreateOfferDto from '../dto/createOffer.dto';
import CompanyNotFound from 'features/companies/exception/companyNotFound.exception';
import OfferAlreadyExists from '../exception/offersAlreadyExists.exception';
import UpdateOfferDto from '../dto/updateOffer.dto';

describe('OffersController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [
        {
          provide: OffersService,
          useValue: offersServiceMock,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/offers (GET)', () => {
    const countOfOffers = 2;
    const offers = OffersMockFactory.buildList(countOfOffers, {
      companyId: null,
    });
    it('should respond with data of the offers', () => {
      offersServiceMock.getAllOffers.mockResolvedValue({
        count: countOfOffers,
        data: offers,
      });

      return request(app.getHttpServer())
        .get('/offers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({ count: countOfOffers, data: offers });
    });
    it('should respond empty array of offers', () => {
      offersServiceMock.getAllOffers.mockResolvedValue({ count: 0, data: [] });

      return request(app.getHttpServer())
        .get('/offers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({ count: 0, data: [] });
    });
    it('should respond with specific data of offers depends on query string "limit"', () => {
      const query = new QueryOfferDto();
      query.limit = 3;
      const getLimitedOffers = offers.slice(0, query.limit);

      offersServiceMock.getAllOffers.mockResolvedValue({
        count: countOfOffers,
        limit: query.limit,
        data: getLimitedOffers,
      });

      return request(app.getHttpServer())
        .get(`/offers?limit=${query.limit}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect({
          count: countOfOffers,
          limit: query.limit,
          data: getLimitedOffers,
        });
    });
  });
  describe('/offers/:id (GET)', () => {
    const offer = OffersMockFactory.build({ companyId: null });
    const offerId = offer.id;
    it('should response with data of the offer by valid id', () => {
      offersServiceMock.getOffersById.mockResolvedValue(offer);

      return request(app.getHttpServer())
        .get(`/offers/${offerId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(offer);
    });
    it('should thrown an error "Not Found" when not found the offer', () => {
      offersServiceMock.getOffersById.mockRejectedValue(
        new OfferNotFound(offerId),
      );

      return request(app.getHttpServer())
        .get(`/offers/${offerId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
    it('should thrown an error "Bad Request" when type invalid id for offer', () => {
      offersServiceMock.getOffersById.mockResolvedValue(null);
      return request(app.getHttpServer())
        .get('/offers/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
  describe('/offers (POST)', () => {
    const companyId = faker.random.uuid();
    const offer = OffersMockFactory.build({
      companyId,
    });
    const createOffer: CreateOfferDto = offer as CreateOfferDto;
    it('should respond with the new offer when pass valid data', () => {
      offersServiceMock.createOffer.mockResolvedValue(offer);

      return request(app.getHttpServer())
        .post('/offers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(createOffer)
        .expect(201)
        .expect(offer);
    });
    it('should thrown an error "Not Found" when not found the company', () => {
      offersServiceMock.createOffer.mockRejectedValue(
        new CompanyNotFound(companyId),
      );

      return request(app.getHttpServer())
        .post('/offers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(createOffer)
        .expect(404);
    });
    it('should thrown an error "Offer Already Exists" when found similar the offer', () => {
      offersServiceMock.createOffer.mockRejectedValue(new OfferAlreadyExists());

      return request(app.getHttpServer())
        .post('/offers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(createOffer)
        .expect(409);
    });
    it('should thrown an error "Bad Request" when pass invalid data', () => {
      createOffer.salaryFrom = 1;

      return request(app.getHttpServer())
        .post('/offers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(createOffer)
        .expect(400);
    });
  });
  describe('/offers (PUT)', () => {
    const companyId = faker.random.uuid();
    const offer = OffersMockFactory.build({ companyId });
    const updateOffer = new UpdateOfferDto();
    it('should respond updated data of the offer by id when pass valid data', () => {
      updateOffer.salaryFrom = 2000;
      offer.salaryFrom = updateOffer.salaryFrom;

      offersServiceMock.updateOffer.mockResolvedValue(offer);

      return request(app.getHttpServer())
        .patch(`/offers/${offer.id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(updateOffer)
        .expect(200)
        .expect(offer);
    });
    it('should thrown an error "Bad Request" when pass invalid data', () => {
      updateOffer.salaryFrom = 1;

      return request(app.getHttpServer())
        .patch(`/offers/${offer.id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(updateOffer)
        .expect(400);
    });
    it('should thrown an error "Not Found" when not found the offer', () => {
      updateOffer.salaryFrom = 2000;

      offersServiceMock.updateOffer.mockRejectedValue(
        new OfferNotFound(offer.id),
      );

      return request(app.getHttpServer())
        .patch(`/offers/${offer.id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(updateOffer)
        .expect(404);
    });
  });
  describe('/offers/:id (DELETE)', () => {
    const offerId = faker.random.uuid();
    it('should remove element when exists and respond with "Offer deleted" message', () => {
      const response = 'OfferDeleted';
      offersServiceMock.deleteOfferById.mockResolvedValue(response);

      return request(app.getHttpServer())
        .delete(`/offers/${offerId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /text/)
        .expect(200)
        .expect(response);
    });
    it('should throw an error "Not Found" when not found the offer', () => {
      offersServiceMock.deleteOfferById.mockRejectedValue(
        new OfferNotFound(offerId),
      );

      return request(app.getHttpServer())
        .delete(`/offers/${offerId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
