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
import FindOneParams from 'utils/findOneParams';
import QueryEntities from './dto/queryCompany.dto';

@Controller('companies')
export default class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getAllCompanies(@Query() query: QueryEntities) {
    return this.companiesService.getAllCompanies(query);
  }

  @Get(':id')
  getCompanyById(@Param() { id }: FindOneParams) {
    return this.companiesService.getCompanyById(id);
  }

  @Post()
  createCompany(@Body() company: CreateCompanyDto) {
    return this.companiesService.createCompany(company);
  }

  @Patch(':id')
  async modifyCompany(
    @Param() { id }: FindOneParams,
    @Body() company: UpdateCompanyDto,
  ) {
    await this.companiesService.getCompanyById(id);
    return this.companiesService.updateCompany(id, company);
  }

  @Delete(':id')
  async deleteCompany(@Param() { id }: FindOneParams) {
    await this.companiesService.getCompanyById(id);
    return this.companiesService.deleteCompanyById(id);
  }
}
