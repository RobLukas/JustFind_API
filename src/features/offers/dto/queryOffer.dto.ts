import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
  IsEnum,
  MaxLength,
  IsUUID,
  MinLength,
} from 'class-validator';
import Pagination from 'src/dto/pagination.dto';
import {
  MainTechnology,
  MainTechnologyCollection,
} from 'offers/types/mainTechnology.types';
import {
  ExperienceLevel,
  ExperienceLevelCollection,
} from 'offers/types/experienceLevel.types';
import { Currency, CurrencyCollection } from 'offers/types/currency.types';

class QueryOfferDto extends Pagination {
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  title: string;

  @IsNumberString()
  @MinLength(3, { message: 'Min value of salary is 1000' })
  @IsNotEmpty()
  @IsOptional()
  salaryFrom: number;

  @IsNumberString()
  @MinLength(3, { message: 'Min value of salary is 1000' })
  @IsNotEmpty()
  @IsOptional()
  salaryTo: number;

  @IsEnum(Currency, {
    message: `currency should contain ${CurrencyCollection}`,
  })
  @IsNotEmpty()
  @IsOptional()
  currency: Currency;

  @IsEnum(ExperienceLevel, {
    message: `experienceLevel should contain ${ExperienceLevelCollection}`,
  })
  @IsNotEmpty()
  @IsOptional()
  experienceLevel: ExperienceLevel;

  @IsEnum(MainTechnology, {
    message: `mainTechnology should contain ${MainTechnologyCollection}`,
  })
  @IsNotEmpty()
  @IsOptional()
  mainTechnology: MainTechnology;
}

export default QueryOfferDto;
