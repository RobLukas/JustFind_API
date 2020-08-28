import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
  IsEnum,
  IsPostalCode,
  IsLatLong,
} from 'class-validator';
import {
  CityCategory,
  CityCategoryCollection,
} from 'offices/types/cityCategory.types';

class UpdateOfficeDto {
  @IsNotEmpty()
  @IsEnum(CityCategory, {
    message: `city should contain ${CityCategoryCollection}`,
  })
  city: CityCategory;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  street: string;

  @IsString()
  @IsNotEmpty()
  @IsPostalCode('PL')
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  country: string;

  @IsString()
  @IsNotEmpty()
  @IsLatLong()
  geoPosition: string;

  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}

export default UpdateOfficeDto;
