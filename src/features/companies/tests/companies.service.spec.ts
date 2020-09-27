import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';

import CompaniesController from 'companies/companies.controller';
import Companies from 'companies/companies.entity';
import CompaniesService from 'companies/companies.service';
import {
  MockType,
  repositoryMockFactory,
} from 'features/__mocks__/repository.factory';
import {
  CompanyMockFactory,
  CompanyWithRelationsMockFactory,
} from '../__mocks__/company.factory';
import CompanyNotFound from 'companies/exception/companyNotFound.exception';
import QueryCompanyDto from 'companies/dto/queryCompany.dto';
import CreateCompanyDto from 'companies/dto/createCompany.dto';
import CompanyAlreadyExists from 'companies/exception/companyAlreadyExists.exception';
import UpdateCompanyDto from 'companies/dto/updateCompany.dto';

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
    it('should return an array of companies', async () => {
      const countOfCompanies = 10;
      const companies = CompanyMockFactory.buildList(countOfCompanies);
      const query = new QueryCompanyDto();
      const { limit, offset, ...entities } = query;

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
      const query = new QueryCompanyDto();

      repositoryMockCompanies.findAndCount.mockReturnValue([
        companies,
        countOfCompanies,
      ]);
      const fetchedCompanies = await companiesService.getAllCompanies(query);

      expect(fetchedCompanies).toEqual({
        count: countOfCompanies,
        data: companies,
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
    const id = faker.random.uuid();
    const companyName = faker.company.companyName();
    const company = CompanyMockFactory.build({ id });
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
        ...company,
        ...updateCompany,
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
