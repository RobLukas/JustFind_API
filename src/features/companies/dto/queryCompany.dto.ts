import PaginationDto from 'utils/dto/pagination.dto';
import {
  IsUUID,
  IsString,
  IsNumberString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

class QueryCompanyDto extends PaginationDto {
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @IsOptional()
  logo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @IsOptional()
  website: string;

  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsOptional()
  size: number;
}

export default QueryCompanyDto;
