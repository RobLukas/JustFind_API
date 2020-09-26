import Offers from 'offers/interface/offers.interface';
import Offices from 'offices/interface/offices.interface';

interface Companies {
  slug: string;
  name: string;
  logo: string;
  website: string;
  size: number;
  offers?: Offers[];
  offices?: Offices[];
}

export default Companies;
