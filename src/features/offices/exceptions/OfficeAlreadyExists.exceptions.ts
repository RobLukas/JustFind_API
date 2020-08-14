import { HttpException, HttpStatus } from '@nestjs/common';

class OfficeAlreadyExists extends HttpException {
  constructor() {
    super('Record already exists', HttpStatus.CONFLICT);
  }
}

export default OfficeAlreadyExists;
