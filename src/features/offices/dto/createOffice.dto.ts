import {
  IsDefined,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsPostalCode,
  IsUUID,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import {
  CityCategory,
  CityCategoryCollection,
} from 'offices/types/cityCategory.types';
import GeometryDto from './Geometry.dto';
import { Type } from 'class-transformer';

class CreateOfficeDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(CityCategory, {
    message: `city should contain ${CityCategoryCollection}`,
  })
  city: CityCategory;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  street: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsPostalCode('PL')
  postalCode: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  country: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GeometryDto)
  @IsNotEmpty()
  geoPosition: GeometryDto;

  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}

export default CreateOfficeDto;
