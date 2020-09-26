import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import CreateCompanyDto from './dto/createCompany.dto';
import UpdateCompanyDto from './dto/updateCompany.dto';
import CompaniesService from './companies.service';
import UUIDParams from 'utils/uuidParams';
import QueryCompanyDto from './dto/queryCompany.dto';

@Controller('companies')
export default class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getAllCompanies(@Query() query: QueryCompanyDto) {
    return this.companiesService.getAllCompanies(query);
  }

  @Get(':id')
  getCompanyById(@Param() { id }: UUIDParams) {
    return this.companiesService.getCompanyById(id);
  }

  @Post()
  createCompany(@Body() company: CreateCompanyDto) {
    return this.companiesService.createCompany(company);
  }

  @Patch(':id')
  async modifyCompany(
    @Param() { id }: UUIDParams,
    @Body() company: UpdateCompanyDto,
  ) {
    return this.companiesService.updateCompany(id, company);
  }

  @Delete(':id')
  async deleteCompany(@Param() { id }: UUIDParams) {
    return this.companiesService.deleteCompanyById(id);
  }
}
