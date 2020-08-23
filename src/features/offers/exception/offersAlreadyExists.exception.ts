import { HttpException, HttpStatus } from '@nestjs/common';

class OfferAlreadyExists extends HttpException {
  constructor() {
    super('Record already exists', HttpStatus.CONFLICT);
  }
}

export default OfferAlreadyExists;
