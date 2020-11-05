import { Currency } from 'offers/types/currency.types';
import { ExperienceLevel } from 'offers/types/experienceLevel.types';
import { MainTechnology } from 'offers/types/mainTechnology.types';
import { TechnologySkillLevel } from 'offers/types/technologySkillLevel.types';

interface Offers {
  slug: string;
  mainTechnology: MainTechnology;
  title: string;
  salaryFrom: number;
  salaryTo: number;
  description: string;
  technologies: TechnologySkillLevel[];
  currency: Currency;
  experienceLevel: ExperienceLevel;
  companyId: string;
}

export default Offers;
