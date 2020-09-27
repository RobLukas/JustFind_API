import { makeFactory } from 'factory.ts';
import * as faker from 'faker';
import Companies from 'companies/interface/companies.interface';
import BasicEntityMockFactory from 'features/__mocks__/basicEntity.factory';
import { each } from 'factory.ts/lib/sync';

export const CompanyMockFactory = makeFactory<Companies>({
  name: each(() => faker.company.companyName()),
  slug: each(() => faker.helpers.slugify(faker.company.companyName())),
  logo: each(() => faker.image.imageUrl()),
  website: each(() => faker.internet.url()),
  size: each(() => faker.random.number()),
}).combine(BasicEntityMockFactory);

export const CompanyWithRelationsMockFactory = CompanyMockFactory.extend({
  offices: [],
  offers: [],
});