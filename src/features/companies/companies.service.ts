import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreateCompanyDto from './dto/createCompany.dto';
import UpdateCompanyDto from './dto/updateCompany.dto';
import Companies from './companies.entity';
import CompanyNotFound from './exception/companyNotFound.exception';
import CompanyAlreadyExists from './exception/companyAlreadyExists.exception';
import GetAllDataResponse from 'utils/dto/getAllDataResponse.dto';
import QueryCompanyDto from './dto/queryCompany.dto';

@Injectable()
export default class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
  ) {}
  async getAllCompanies(
    query: QueryCompanyDto,
  ): Promise<GetAllDataResponse<Companies>> {
    const { limit, offset, ...entities } = query;
    const [companies, count] = await this.companiesRepository.findAndCount({
      where: entities,
      take: limit,
      skip: offset,
    });

    return {
      count,
      limit,
      offset,
      data: companies,
    };
  }
  async getCompanyById(id: string) {
    const company = await this.companiesRepository.findOne(id, {
      relations: ['offices', 'offers'],
    });
    if (!company) {
      throw new CompanyNotFound(id);
    }
    return company;
  }
  async createCompany(company: CreateCompanyDto) {
    const { name } = company;
    const companyExists = await this.companiesRepository.findOne({
      name,
    });
    if (companyExists) {
      throw new CompanyAlreadyExists();
    }
    const newCompany = this.companiesRepository.create(company);
    const createdCompany = await this.companiesRepository.save(newCompany);
    return createdCompany;
  }
  async updateCompany(id: string, updateCompany: UpdateCompanyDto) {
    const company = await this.companiesRepository.findOne(id);

    if (!company) {
      throw new CompanyNotFound(id);
    }

    const newCompany = this.companiesRepository.create({
      ...company,
      ...updateCompany,
    });

    const updatedCompany = await this.companiesRepository.save(newCompany);
    return updatedCompany;
  }
  async deleteCompanyById(id: string) {
    const deleteResponse = await this.companiesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new CompanyNotFound(id);
    }
    return 'Company deleted';
  }
}
