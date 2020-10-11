import * as faker from 'faker';
import { makeFactory, each } from 'factory.ts/lib/sync';
import BaseEntity from 'utils/interface/baseEntity.interface';

const BasicEntityMockFactory = makeFactory<BaseEntity>({
  id: each(() => faker.random.uuid()),
  createdAt: each(() => new Date()),
  updatedAt: each(() => new Date()),
});

export default BasicEntityMockFactory;
