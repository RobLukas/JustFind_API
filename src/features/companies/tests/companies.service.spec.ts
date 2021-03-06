import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';

import CompaniesController from '../companies.controller';
import Companies from '../companies.entity';
import CompaniesService from '../companies.service';
import {
  MockType,
  repositoryMockFactory,
} from 'features/__mocks__/repository.mock';
import {
  CompanyMockFactory,
  CompanyWithRelationsMockFactory,
} from '../__factories__/company.factory';
import QueryCompanyDto from '../dto/queryCompany.dto';
import CreateCompanyDto from '../dto/createCompany.dto';
import UpdateCompanyDto from '../dto/updateCompany.dto';
import CompanyAlreadyExists from '../exception/companyAlreadyExists.exception';
import CompanyNotFound from '../exception/companyNotFound.exception';

describe('CompaniesService', () => {
  let companiesService: CompaniesService;
  let repositoryMockCompanies: MockType<Repository<Companies>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Companies),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    companiesService = moduleRef.get<CompaniesService>(CompaniesService);
    repositoryMockCompanies = moduleRef.get<MockType<Repository<Companies>>>(
      getRepositoryToken(Companies),
    );
  });

  describe('getAllCompanies', () => {
    const query = new QueryCompanyDto();
    const { limit, offset, ...entities } = query;
    it('should return an array of companies', async () => {
      const countOfCompanies = 10;
      const companies = CompanyMockFactory.buildList(countOfCompanies);

      repositoryMockCompanies.findAndCount.mockReturnValue([
        companies,
        countOfCompanies,
      ]);
      const fetchedCompanies = await companiesService.getAllCompanies(query);

      expect(fetchedCompanies).toEqual({
        count: countOfCompanies,
        data: companies,
      });
      expect(repositoryMockCompanies.findAndCount).toHaveBeenCalledWith({
        where: entities,
        take: limit,
        skip: offset,
      });
    });
    it('should return an empty array of companies', async () => {
      const companies: Companies[] = [];
      const countOfCompanies = 0;

      repositoryMockCompanies.findAndCount.mockReturnValue([
        companies,
        countOfCompanies,
      ]);
      const fetchedCompanies = await companiesService.getAllCompanies(query);

      expect(fetchedCompanies).toEqual({
        count: countOfCompanies,
        data: companies,
      });
      expect(repositoryMockCompanies.findAndCount).toHaveBeenCalledWith({
        where: entities,
        take: limit,
        skip: offset,
      });
    });
  });
  describe('getCompanyById', () => {
    const company = CompanyWithRelationsMockFactory.build();
    const { id } = company;
    const companyRelations = { relations: ['offices', 'offers'] };
    it('should return an object of company by id with relations offices and offers', async () => {
      repositoryMockCompanies.findOne.mockReturnValue(Promise.resolve(company));

      const fetchedCompany = await companiesService.getCompanyById(id);

      expect(fetchedCompany).toEqual(company);
      expect(repositoryMockCompanies.findOne).toHaveBeenCalledWith(
        id,
        companyRelations,
      );
    });
    it("should throw an error 'CompanyNotFound' when not found an object of company", async () => {
      repositoryMockCompanies.findOne.mockReturnValue(
        Promise.resolve(undefined),
      );

      await expect(companiesService.getCompanyById(id)).rejects.toThrow(
        CompanyNotFound,
      );
      expect(repositoryMockCompanies.findOne).toHaveBeenCalledWith(
        id,
        companyRelations,
      );
    });
  });
  describe('createCompany', () => {
    const company = CompanyMockFactory.build();
    const { name } = company;
    it('should return an object of company entity when created', async () => {
      repositoryMockCompanies.findOne.mockReturnValue(
        Promise.resolve(undefined),
      );
      repositoryMockCompanies.create.mockReturnValue(company);
      repositoryMockCompanies.save.mockReturnValue(Promise.resolve(company));

      const companyDto: CreateCompanyDto = company;
      const createdCompany = await companiesService.createCompany(companyDto);

      expect(createdCompany).toEqual(company);
      expect(repositoryMockCompanies.findOne).toHaveBeenCalledWith({
        name,
      });
      expect(repositoryMockCompanies.create).toHaveBeenCalledWith(company);
      expect(repositoryMockCompanies.save).toHaveBeenCalledWith(company);
    });
    it("should throw an error 'CompanyAlreadyExists' when found the same object of company", async () => {
      repositoryMockCompanies.findOne.mockReturnValue(Promise.resolve(company));

      await expect(companiesService.createCompany(company)).rejects.toThrow(
        CompanyAlreadyExists,
      );
      expect(repositoryMockCompanies.findOne).toHaveBeenCalledWith({
        name,
      });
    });
  });
  describe('updateCompany', () => {
    const companyName = faker.company.companyName();
    const company = CompanyMockFactory.build();
    const { id } = company;
    it('should return an object of company entity when updated with correct parameters', async () => {
      const updateCompany = new UpdateCompanyDto();
      updateCompany.name = companyName;

      const newCompany = {
        ...company,
        ...updateCompany,
      };
      const updatedCompany = { ...newCompany };

      repositoryMockCompanies.findOne.mockReturnValue(Promise.resolve(company));
      repositoryMockCompanies.create.mockReturnValue(newCompany);
      repositoryMockCompanies.save.mockReturnValue(
        Promise.resolve(updatedCompany),
      );
      const result = await companiesService.updateCompany(id, updateCompany);

      expect(result).toEqual(updatedCompany);
      expect(repositoryMockCompanies.findOne).toHaveBeenCalledWith(id);
      expect(repositoryMockCompanies.create).toHaveBeenCalledWith({
        ...newCompany,
      });
      expect(repositoryMockCompanies.save).toHaveBeenCalledWith(updatedCompany);
    });
    it("should throw an error 'CompanyNotFound' when not found the object of company", async () => {
      const updateCompany = new UpdateCompanyDto();

      repositoryMockCompanies.findOne.mockReturnValue(
        Promise.resolve(undefined),
      );

      await expect(
        companiesService.updateCompany(id, updateCompany),
      ).rejects.toThrow(CompanyNotFound);
      expect(repositoryMockCompanies.findOne).toHaveBeenCalledWith(id);
    });
  });
  describe('deleteCompanyById', () => {
    const { id } = CompanyMockFactory.build();
    it("should return a string 'Company deleted' when company deleted", async () => {
      repositoryMockCompanies.delete.mockReturnValue(
        Promise.resolve({ affected: 1 }),
      );

      const deleteCompany = await companiesService.deleteCompanyById(id);

      expect(deleteCompany).toEqual('Company deleted');
      expect(repositoryMockCompanies.delete).toHaveBeenCalledWith(id);
    });
    it("should throw an error 'CompanyNotFound' when not found an object of company", async () => {
      repositoryMockCompanies.delete.mockReturnValue(
        Promise.resolve({ affected: 0 }),
      );

      await expect(companiesService.deleteCompanyById(id)).rejects.toThrow(
        CompanyNotFound,
      );
      expect(repositoryMockCompanies.delete).toHaveBeenCalledWith(id);
    });
  });
});
