import { NotFoundException } from '@nestjs/common';

class CompanyNotFound extends NotFoundException {
  constructor(companyId: string) {
    super(`Company with id ${companyId} not found`);
  }
}

export default CompanyNotFound;
