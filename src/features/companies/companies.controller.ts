import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import CreateCompanyDto from './dto/createCompany.dto';
import UpdateCompanyDto from './dto/updateCompany.dto';
import CompaniesService from './companies.service';

@Controller('companies')
export default class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  @Get(':id')
  getCompanyById(@Param('id') id: string) {
    return 'get by id';
  }

  @Post()
  createCompany(@Body() company: CreateCompanyDto) {
    return 'asd';
  }

  @Put(':id')
  modifyCompany(@Param('id') id: string, @Body() Company: UpdateCompanyDto) {
    return 'asd';
  }

  @Delete(':id')
  deleteCompany(@Param('id') id: string) {
    return 'asd';
  }

  @Delete()
  deleteAllCompanies() {}
}
