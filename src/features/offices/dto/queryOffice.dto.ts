import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  IsEnum,
  IsPostalCode,
  IsLatLong,
} from 'class-validator';
import PaginationDto from 'utils/dto/pagination.dto';
import {
  CityCategory,
  CityCategoryCollection,
} from 'offices/types/cityCategory.types';

class QueryOfficeDto extends PaginationDto {
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsEnum(CityCategory, {
    message: `city should contain ${CityCategoryCollection}`,
  })
  @IsOptional()
  city: CityCategory;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  street: string;

  @IsString()
  @IsNotEmpty()
  @IsPostalCode('PL')
  @IsOptional()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @IsOptional()
  country: string;

  @IsString()
  @IsNotEmpty()
  @IsLatLong()
  @IsOptional()
  geoPosition: string;
}

export default QueryOfficeDto;
