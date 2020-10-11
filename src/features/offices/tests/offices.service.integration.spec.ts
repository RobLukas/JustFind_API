import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';

import {
  MockType,
  repositoryMockFactory,
} from 'features/__mocks__/repository.mock';
import GeoCodeApiService from 'geoCodeApi/geoCodeApi.service';
import OfficesController from '../offices.controller';
import Offices from '../offices.entity';
import OfficesService from '../offices.service';
import officesMockFactory from '../__factories__/offices.factory';
import geometryMockFactory from 'geoCodeApi/__factories__/geometry.factory';
import CreateOfficeDto from '../dto/createOffice.dto';
import configServiceMock from 'features/__mocks__/config.service.mock';
import httpServiceMock from 'features/__mocks__/http.service.mock';
import { of } from 'rxjs';

describe('OfficesService', () => {
  let repositoryMockOffices: MockType<Repository<Offices>>;
  let officesService: OfficesService;
  let geoCodeApiService: GeoCodeApiService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OfficesController],
      providers: [
        OfficesService,
        GeoCodeApiService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
        {
          provide: getRepositoryToken(Offices),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    officesService = moduleRef.get<OfficesService>(OfficesService);
    geoCodeApiService = moduleRef.get<GeoCodeApiService>(GeoCodeApiService);
    repositoryMockOffices = moduleRef.get<MockType<Repository<Offices>>>(
      getRepositoryToken(Offices),
    );
  });
  describe('when getting the data of geo position', () => {
    const geometry = geometryMockFactory.build();
    const createOffice = new CreateOfficeDto();
    beforeEach(async () => {
      httpServiceMock.get.mockReturnValue({
        pipe: jest.fn().mockReturnValue(of(geometry)),
        toPromise: jest.fn().mockReturnValue(Promise.resolve(geometry)),
      });
    });
    it('should attempt to get a geometry by address', async () => {
      const getGeometrySpy = jest.spyOn(
        geoCodeApiService,
        'getLatLongByAddress',
      );
      await officesService.createOffice(createOffice);
      expect(getGeometrySpy).toBeCalledTimes(1);
    });
    describe('and the address of createOffice is not correct', () => {
      const office = officesMockFactory.build({
        companyId: faker.random.uuid(),
        geoPosition: geometry,
      });
      beforeEach(async () => {
        repositoryMockOffices.save.mockReturnValue(Promise.resolve(office));
        httpServiceMock.get.mockReturnValue({
          pipe: jest.fn().mockReturnValue(of(geometry)),
          toPromise: jest.fn().mockReturnValue(Promise.resolve(geometry)),
        });
      });
      it('should attempt to get a geometry by address', async () => {
        const fetchedCreateOffice = await officesService.createOffice(
          createOffice,
        );
        expect(fetchedCreateOffice).toEqual(office);
      });
    });
    describe('and the address of createOffice is correct', () => {
      const office = officesMockFactory.build({
        companyId: faker.random.uuid(),
        geoPosition: null,
      });
      beforeEach(async () => {
        repositoryMockOffices.save.mockReturnValue(Promise.resolve(office));
        httpServiceMock.get.mockReturnValue({
          pipe: jest.fn().mockReturnValue(of(null)),
          toPromise: jest.fn().mockReturnValue(Promise.resolve(null)),
        });
      });
      it('should attempt to get a geometry by address', async () => {
        const fetchedCreateOffice = await officesService.createOffice(
          createOffice,
        );

        expect(fetchedCreateOffice).toEqual(office);
      });
    });
  });
});
