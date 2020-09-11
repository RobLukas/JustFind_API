import { ConflictException } from '@nestjs/common';

class OfficeAlreadyExists extends ConflictException {
  constructor() {
    super('Record already exists');
  }
}

export default OfficeAlreadyExists;
