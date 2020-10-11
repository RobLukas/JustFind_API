import * as faker from 'faker';
import { each, makeFactory } from 'factory.ts';
import { Address } from '../types/address.types';
import getRandomEnum from 'utils/getRandomEnum';
import { CityCategory } from '../types/cityCategory.types';

const addressMockFactory = makeFactory<Address>({
  city: getRandomEnum(CityCategory),
  street: each(() => faker.address.city(2)),
  postalCode: each(() => faker.address.city(2)),
  country: each(() => faker.address.country()),
});

export default addressMockFactory;
