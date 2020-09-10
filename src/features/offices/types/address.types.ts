import { CityCategory } from './cityCategory.types';

export type Address = {
  city: CityCategory;
  street: string;
  postalCode: string;
  country: string;
};
