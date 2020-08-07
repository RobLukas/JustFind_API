import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateCompanyDto from './dto/createCompany.dto';
import UpdateCompanyDto from './dto/updateCompany.dto';
import Companies from './companies.entity';
import CompanyNotFound from './exception/companyNotFound.exception';
import CompanyAlreadyExists from './exception/companyAlreadyExists.exception';
import GetAllDataResponse from 'src/dto/getAllDataResponse.dto';
import QueryEntities from './dto/queryCompany.dto';

@Injectable()
export default class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
  ) {}
  async getAllCompanies(
    query: QueryEntities,
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
    const company = await this.companiesRepository.findOne(id);
    if (company) {
      return company;
    }
    throw new CompanyNotFound(id);
  }
  async getCompanyBySlug(slug: string) {
    const company = await this.companiesRepository.findOne({ slug });
    if (company) {
      return company;
    }
    throw new CompanyNotFound(slug);
  }
  async createCompany(company: CreateCompanyDto) {
    const companyExists = await this.companiesRepository.findOne({
      name: company.name,
    });
    if (companyExists) {
      throw new CompanyAlreadyExists();
    }
    const newCompany = await this.companiesRepository.create(company);
    await this.companiesRepository.save(newCompany);
    return newCompany;
  }
  async updateCompany(id: string, company: UpdateCompanyDto) {
    await this.companiesRepository.update(id, company);
    const updatedCompany = await this.companiesRepository.findOne(id);
    if (updatedCompany) {
      return updatedCompany;
    }
    throw new CompanyNotFound(id);
  }
  async deleteCompanyById(id: string) {
    const deleteResponse = await this.companiesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new CompanyNotFound(id);
    }
    return 'Company deleted';
  }
}
