import { CityCategory } from 'offices/types/cityCategory.types';
import { Geometry } from 'offices/types/geometry.types';

interface Offices {
  city: CityCategory;
  street: string;
  postalCode: string;
  country: string;
  geoPosition: Geometry;
  companyId: string;
}

export default Offices;
