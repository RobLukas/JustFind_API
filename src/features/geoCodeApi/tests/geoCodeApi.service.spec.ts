import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';

import GeoCodeApiService from '../geoCodeApi.service';
import configServiceMock from 'features/__mocks__/config.service.mock';
import httpServiceMock from 'features/__mocks__/http.service.mock';
import addressMockFactory from 'offices/__factories__/address.factory';
import geometryMockFactory from '../__factories__/geometry.factory';
import { Geometry } from 'offices/types/geometry.types';

describe('geoCodeApiService', () => {
  let geoCodeApiService: GeoCodeApiService;
  let geometry: Geometry;

  beforeEach(async () => {
    geometry = geometryMockFactory.build();
    const moduleRef = await Test.createTestingModule({
      providers: [
        GeoCodeApiService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();
    geoCodeApiService = moduleRef.get<GeoCodeApiService>(GeoCodeApiService);
  });
  describe('getLatLongByAddress', () => {
    const address = addressMockFactory.build();
    describe('should return geometry lat and long object', () => {
      beforeEach(async () => {
        httpServiceMock.get.mockReturnValue({
          pipe: jest.fn().mockReturnValue(of(geometry)),
          toPromise: jest.fn().mockReturnValue(geometry),
        });
      });
      it('with correct address', async () => {
        const fetchedGeometry = await geoCodeApiService.getLatLongByAddress(
          address,
        );
        expect(fetchedGeometry).toEqual(geometry);
        expect(httpServiceMock.get).toHaveBeenCalledTimes(1);
      });
    });
    describe('should return null of geometry', () => {
      beforeEach(async () => {
        httpServiceMock.get.mockReturnValue({
          pipe: jest.fn().mockReturnValue(of(null)),
          toPromise: jest.fn().mockReturnValue(null),
        });
      });
      it('with incorrect address', async () => {
        const fetchedGeometry = await geoCodeApiService.getLatLongByAddress(
          address,
        );
        expect(fetchedGeometry).toEqual(null);
        expect(httpServiceMock.get).toHaveBeenCalledTimes(1);
      });
    });
  });
});
