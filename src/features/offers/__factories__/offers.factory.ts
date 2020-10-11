import { each } from 'factory.ts';
import * as faker from 'faker';

import BasicEntityMockFactory from 'features/__factories__/basicEntity.factory';
import getRandomEnum from 'utils/getRandomEnum';
import roundSalary from 'utils/roundSalary';
import Offers from 'offers/interface/offers.interface';
import { Currency } from 'offers/types/currency.types';
import { ExperienceLevel } from 'offers/types/experienceLevel.types';
import { MainTechnology } from 'offers/types/mainTechnology.types';
import { SkillLevel } from 'offers/types/technologySkillLevel.types';
import { makeFactoryWithRequired } from 'factory.ts/lib/sync';

const OffersMockFactory = makeFactoryWithRequired<Offers, 'companyId'>({
  title: each(() => faker.name.jobTitle()),
  slug: each(() =>
    faker.helpers.slugify(
      `${faker.company.companyName()} ${faker.name.jobTitle()}`,
    ),
  ),
  salaryFrom: each(() => roundSalary(faker.random.number({ min: 1000 }))),
  salaryTo: each(() => roundSalary(faker.random.number({ min: 1000 }))),
  description: each(() => faker.name.jobDescriptor()),
  technologies: [
    {
      technology: 'technology1',
      skillLevel: getRandomEnum(SkillLevel),
    },
    {
      technology: 'technology2',
      skillLevel: getRandomEnum(SkillLevel),
    },
  ],
  currency: getRandomEnum(Currency),
  experienceLevel: getRandomEnum(ExperienceLevel),
  mainTechnology: getRandomEnum(MainTechnology),
}).combine(BasicEntityMockFactory);

export default OffersMockFactory;
