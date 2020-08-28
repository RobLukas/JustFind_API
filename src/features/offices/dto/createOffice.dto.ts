import {
  IsDefined,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsPostalCode,
  IsUUID,
  IsEnum,
  IsLatLong,
} from 'class-validator';
import {
  CityCategory,
  CityCategoryCollection,
} from 'offices/types/cityCategory.types';

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

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsLatLong()
  geoPosition: string;

  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}

export default CreateOfficeDto;
