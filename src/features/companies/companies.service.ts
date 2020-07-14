import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateCompanyDto from './dto/createCompany.dto';
import UpdateCompanyDto from './dto/updateCompany.dto';
import Companies from './companies.entity';

@Injectable()
export default class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
  ) {}
  getAllCompanies() {
    return this.companiesRepository.find();
  }
  async getCompanyById(id: string) {
    const company = await this.companiesRepository.findOne(id);
    if (company) {
      return company;
    }
    throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
  }
  async createCompany(company: CreateCompanyDto) {
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
    throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
  }
  async deleteCompanyById(id: string) {
    const deleteResponse = await this.companiesRepository.delete(id);
    if (!deleteResponse.affected) {
      console.log(deleteResponse.affected);
      console.log(deleteResponse.raw);
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return 'Company deleted';
  }
}
