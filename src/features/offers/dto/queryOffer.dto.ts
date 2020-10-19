import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MaxLength,
  IsUUID,
  IsNumber,
  Min,
} from 'class-validator';
import PaginationDto from 'utils/dto/pagination.dto';
import {
  MainTechnology,
  MainTechnologyCollection,
} from 'offers/types/mainTechnology.types';
import {
  ExperienceLevel,
  ExperienceLevelCollection,
} from 'offers/types/experienceLevel.types';
import { Currency, CurrencyCollection } from 'offers/types/currency.types';
import { Type } from 'class-transformer';

class QueryOfferDto extends PaginationDto {
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

  @Type(() => Number)
  @IsNumber()
  @Min(1000)
  @IsNotEmpty()
  @IsOptional()
  salaryFrom: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1000)
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
