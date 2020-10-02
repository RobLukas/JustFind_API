import { each, makeFactoryWithRequired } from 'factory.ts/lib/sync';
import BasicEntityMockFactory from 'features/__mocks__/basicEntity.factory';
import * as faker from 'faker';
import getRandomEnum from 'utils/getRandomEnum';
import Offices from '../interface/offices.interface';
import { CityCategory } from '../types/cityCategory.types';

const officesMockFactory = makeFactoryWithRequired<Offices, 'companyId'>({
  city: getRandomEnum(CityCategory),
  street: each(() => faker.address.streetAddress()),
  postalCode: each(() => faker.address.zipCode('PL')),
  country: 'poland',
  geoPosition: null,
}).combine(BasicEntityMockFactory);

export default officesMockFactory;
