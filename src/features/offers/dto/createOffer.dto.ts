import {
  IsDefined,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumberString,
  IsUUID,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  ValidateNested,
  ArrayMaxSize,
  MinLength,
} from 'class-validator';
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
import TechnologySkillLevelDto from './technologySkillLevel.dto';

class CreateOfferDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsDefined()
  @IsNumberString()
  @MinLength(3, { message: 'Min value of salary is 1000' })
  @IsNotEmpty()
  salaryFrom: number;

  @IsDefined()
  @IsNumberString()
  @MinLength(3, { message: 'Min value of salary is 1000' })
  @IsNotEmpty()
  salaryTo: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(8)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TechnologySkillLevelDto)
  technologies: TechnologySkillLevelDto[];

  @IsDefined()
  @IsEnum(Currency, {
    message: `currency should contain ${CurrencyCollection}`,
  })
  @IsNotEmpty()
  currency: Currency;

  @IsDefined()
  @IsEnum(ExperienceLevel, {
    message: `experienceLevel should contain ${ExperienceLevelCollection}`,
  })
  @IsNotEmpty()
  experienceLevel: ExperienceLevel;

  @IsDefined()
  @IsEnum(MainTechnology, {
    message: `mainTechnology should contain ${MainTechnologyCollection}`,
  })
  @IsNotEmpty()
  mainTechnology: MainTechnology;

  @IsDefined()
  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}

export default CreateOfferDto;
