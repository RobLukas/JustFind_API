import { NotFoundException } from '@nestjs/common';

class OfferNotFound extends NotFoundException {
  constructor(offerId: string) {
    super(`Offer with id ${offerId} not found`);
  }
}

export default OfferNotFound;
