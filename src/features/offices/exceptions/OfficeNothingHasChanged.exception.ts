import { HttpException, HttpStatus } from '@nestjs/common';

class OfficeNothingHasChanged extends HttpException {
  constructor() {
    super('Nothing has changed', HttpStatus.NOT_MODIFIED);
  }
}

export default OfficeNothingHasChanged;
