import { NotFoundException } from '@nestjs/common';

class OfficeNotFound extends NotFoundException {
  constructor(officeId: string) {
    super(`Office with id ${officeId} not found`);
  }
}

export default OfficeNotFound;
