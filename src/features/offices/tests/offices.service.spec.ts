import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import GeoCodeApiService from 'geoCodeApi/geoCodeApi.service';
import {
  MockType,
  repositoryMockFactory,
} from 'features/__mocks__/repository.mock';
import QueryOfficeDto from '../dto/queryOffice.dto';
import OfficeNotFound from '../exceptions/OfficeNotFound.exceptions';
import OfficesController from '../offices.controller';
import Offices from '../offices.entity';
import OfficesService from '../offices.service';
import officesMockFactory from '../__factories__/offices.factory';
import geoCodeApiServiceMock from '../../__mocks__/geoCodeApi.service.mock';
import geometryMockFactory from 'geoCodeApi/__factories__/geometry.factory';
import { Geometry } from '../types/geometry.types';
import OfficeAlreadyExists from '../exceptions/OfficeAlreadyExists.exceptions';
import UpdateOfficeDto from '../dto/updateOffice.dto';
import OfficeNothingHasChanged from '../exceptions/OfficeNothingHasChanged.exception';

describe('OfficesService', () => {
  let officesService: OfficesService;
  let repositoryMockOffices: MockType<Repository<Offices>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OfficesController],
      providers: [
        OfficesService,
        {
          provide: GeoCodeApiService,
          useValue: geoCodeApiServiceMock,
        },
        {
          provide: getRepositoryToken(Offices),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    officesService = moduleRef.get<OfficesService>(OfficesService);
    repositoryMockOffices = moduleRef.get<MockType<Repository<Offices>>>(
      getRepositoryToken(Offices),
    );
  });

  describe('getAllOffices', () => {
    const query = new QueryOfficeDto();
    const { limit, offset, ...entities } = query;
    it('should return an array of offices', async () => {
      const companyId = faker.random.uuid();
      const countOfOffices = 10;
      const offices = officesMockFactory.buildList(countOfOffices, {
        companyId,
      });

      repositoryMockOffices.findAndCount.mockReturnValue(
        Promise.resolve([offices, countOfOffices]),
      );

      const fetchedOffices = await officesService.getAllOffices(query);

      expect(fetchedOffices).toEqual({ count: countOfOffices, data: offices });
      expect(repositoryMockOffices.findAndCount).toHaveBeenCalledWith({
        where: entities,
        take: limit,
        skip: offset,
      });
    });
    it('should return an empty array of offices', async () => {
      const offices: Offices[] = [];
      const countOfOffices = 0;

      repositoryMockOffices.findAndCount.mockReturnValue(
        Promise.resolve([offices, countOfOffices]),
      );

      const fetchedOffices = await officesService.getAllOffices(query);

      expect(fetchedOffices).toEqual({ count: countOfOffices, data: offices });
      expect(repositoryMockOffices.findAndCount).toHaveBeenCalledWith({
        where: entities,
        take: limit,
        skip: offset,
      });
    });
  });
  describe('getOfficeById', () => {
    const companyId = faker.random.uuid();
    const office = officesMockFactory.build({ companyId });
    const officeRelations = { relations: ['company'] };
    const { id } = office;
    it('should return an object of office by id with company relation', async () => {
      repositoryMockOffices.findOne.mockReturnValue(Promise.resolve(office));
      const fetchedOffice = await officesService.getOfficeById(id);

      expect(fetchedOffice).toEqual(office);
      expect(repositoryMockOffices.findOne).toHaveBeenCalledWith(
        id,
        officeRelations,
      );
    });
    it("should throw an error 'OfficeNotFound' when not found an object of office", async () => {
      repositoryMockOffices.findOne.mockReturnValue(Promise.resolve(undefined));

      await expect(officesService.getOfficeById(id)).rejects.toThrow(
        OfficeNotFound,
      );
      expect(repositoryMockOffices.findOne).toHaveBeenCalledWith(
        id,
        officeRelations,
      );
    });
  });
  describe('createOffice', () => {
    const companyId = faker.random.uuid();
    const office = officesMockFactory.build({ companyId });
    const geoPosition: Geometry | null = null;
    it('should return an object of office entity when created', async () => {
      const newOffice = { ...office, geoPosition };
      const createdOffice = { ...newOffice };

      repositoryMockOffices.findOne.mockReturnValue(Promise.resolve(undefined));
      repositoryMockOffices.create.mockReturnValue(newOffice);
      repositoryMockOffices.save.mockReturnValue(
        Promise.resolve(createdOffice),
      );
      geoCodeApiServiceMock.getLatLongByAddress.mockReturnValue(
        Promise.resolve(geoPosition),
      );
      const fetchedCreateOffice = await officesService.createOffice(office);

      expect(fetchedCreateOffice).toEqual(createdOffice);
      expect(repositoryMockOffices.findOne).toHaveBeenCalledWith(office);
      expect(repositoryMockOffices.create).toHaveBeenCalledWith(newOffice);
      expect(repositoryMockOffices.save).toHaveBeenCalledWith(createdOffice);
      expect(geoCodeApiServiceMock.getLatLongByAddress).toHaveBeenCalledWith(
        office,
      );
    });
    it('should throw an error "OfficeAlreadyExists" when found the same object of office', async () => {
      repositoryMockOffices.findOne.mockReturnValue(Promise.resolve(office));

      await expect(officesService.createOffice(office)).rejects.toThrow(
        OfficeAlreadyExists,
      );
      expect(repositoryMockOffices.findOne).toHaveBeenCalledWith(office);
    });
  });
  describe('updateOffice', () => {
    const companyId = faker.random.uuid();
    const office = officesMockFactory.build({ companyId });
    const geoPosition: Geometry | null = geometryMockFactory.build();
    const { id } = office;
    it('should return an object of office entity, when updated with correct parameters', async () => {
      const updateOffice = new UpdateOfficeDto();
      updateOffice.street = 'street';

      const newOffice = {
        ...office,
        ...updateOffice,
        geoPosition,
      };
      const updatedOffice = { ...newOffice };

      repositoryMockOffices.findOne.mockReturnValue(Promise.resolve(office));
      repositoryMockOffices.create.mockReturnValue(newOffice);
      repositoryMockOffices.save.mockReturnValue(
        Promise.resolve(updatedOffice),
      );
      geoCodeApiServiceMock.getLatLongByAddress.mockReturnValue(
        Promise.resolve(geoPosition),
      );

      const fetchedUpdateOffice = await officesService.updateOffice(
        id,
        updateOffice,
      );

      expect(fetchedUpdateOffice).toEqual(updatedOffice);
      expect(repositoryMockOffices.findOne).toHaveBeenCalledWith(id);
      expect(repositoryMockOffices.create).toHaveBeenCalledWith(newOffice);
      expect(repositoryMockOffices.save).toHaveBeenCalledWith(updatedOffice);
      expect(geoCodeApiServiceMock.getLatLongByAddress).toHaveBeenCalledWith({
        ...office,
        ...updateOffice,
      });
    });
    it('should throw an error "OfficeNotFound", when not found the object of office', async () => {
      const updateOffice = new UpdateOfficeDto();
      repositoryMockOffices.findOne.mockReturnValue(Promise.resolve(undefined));

      await expect(
        officesService.updateOffice(id, updateOffice),
      ).rejects.toThrow(OfficeNotFound);

      expect(repositoryMockOffices.findOne).toHaveBeenCalledWith(id);
    });
    it('should throw an error "OfficeNothingHasChanged", when update parameters are empty', async () => {
      const updateOffice = new UpdateOfficeDto();
      repositoryMockOffices.findOne.mockReturnValue(Promise.resolve(office));

      await expect(
        officesService.updateOffice(id, updateOffice as UpdateOfficeDto),
      ).rejects.toThrow(OfficeNothingHasChanged);
      expect(repositoryMockOffices.findOne).toHaveBeenCalledWith(id);
    });
  });
  describe('deleteOfficeById', () => {
    const companyId = faker.random.uuid();
    const office = officesMockFactory.build({ companyId });
    const { id } = office;
    it('should return a string "Office deleted" when office deleted', async () => {
      repositoryMockOffices.delete.mockReturnValue(
        Promise.resolve({ affected: 1 }),
      );

      const deleteOffice = await officesService.deleteOfficeById(id);
      expect(deleteOffice).toEqual('Office deleted');
      expect(repositoryMockOffices.delete).toHaveBeenCalledWith(id);
    });
    it('should thrown an error "OfficeNotFound" when not found an object of office', async () => {
      repositoryMockOffices.delete.mockReturnValue(
        Promise.resolve({ affected: 0 }),
      );

      await expect(officesService.deleteOfficeById(id)).rejects.toThrow(
        OfficeNotFound,
      );
      expect(repositoryMockOffices.delete).toHaveBeenCalledWith(id);
    });
  });
});
