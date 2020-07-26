import { HttpException, HttpStatus } from '@nestjs/common';

class CompanyAlreadyExists extends HttpException {
  constructor() {
    super('Record already exists', HttpStatus.CONFLICT);
  }
}

export default CompanyAlreadyExists;
