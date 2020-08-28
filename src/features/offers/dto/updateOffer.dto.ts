import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
  IsNumberString,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  MinLength,
  ArrayMaxSize,
  ValidateNested,
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
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNumberString()
  @MinLength(3, { message: 'Min value of salary is 1000' })
  @IsNotEmpty()
  salaryFrom: number;

  @IsNumberString()
  @MinLength(3, { message: 'Min value of salary is 1000' })
  @IsNotEmpty()
  salaryTo: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(8)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TechnologySkillLevelDto)
  technologies: TechnologySkillLevelDto[];

  @IsEnum(Currency, {
    message: `currency should contain ${CurrencyCollection}`,
  })
  @IsNotEmpty()
  currency: Currency;

  @IsEnum(ExperienceLevel, {
    message: `experienceLevel should contain ${ExperienceLevelCollection}`,
  })
  @IsNotEmpty()
  experienceLevel: ExperienceLevel;

  @IsEnum(MainTechnology, {
    message: `mainTechnology should contain ${MainTechnologyCollection}`,
  })
  @IsNotEmpty()
  mainTechnology: MainTechnology;

  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}

export default UpdateOfferDto;
