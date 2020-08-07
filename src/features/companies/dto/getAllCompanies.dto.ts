import Companies from 'companies/companies.entity';

class GetAllCompaniesResponse {
  data: Companies[];
  count: number;
  limit: number;
  offset: number;
}

export default GetAllCompaniesResponse;
