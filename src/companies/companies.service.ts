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
}
