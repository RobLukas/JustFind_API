import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import TechnologySkillLevelDto from 'offers/dto/technologySkillLevel.dto';
import { Currency, CurrencyCollection } from 'offers/types/currency.types';
import {
  ExperienceLevel,
  ExperienceLevelCollection,
} from 'offers/types/experienceLevel.types';
import {
  MainTechnology,
  MainTechnologyCollection,
} from 'offers/types/mainTechnology.types';
import { Type } from 'class-transformer';

class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1000)
  @IsNotEmpty()
  salaryFrom: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1000)
  @IsNotEmpty()
  salaryTo: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(8)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TechnologySkillLevelDto)
  technologies: TechnologySkillLevelDto[];

  @IsOptional()
  @IsEnum(Currency, {
    message: `currency should contain ${CurrencyCollection}`,
  })
  @IsNotEmpty()
  currency: Currency;

  @IsOptional()
  @IsEnum(ExperienceLevel, {
    message: `experienceLevel should contain ${ExperienceLevelCollection}`,
  })
  @IsNotEmpty()
  experienceLevel: ExperienceLevel;

  @IsOptional()
  @IsEnum(MainTechnology, {
    message: `mainTechnology should contain ${MainTechnologyCollection}`,
  })
  @IsNotEmpty()
  mainTechnology: MainTechnology;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}

export default UpdateOfferDto;
