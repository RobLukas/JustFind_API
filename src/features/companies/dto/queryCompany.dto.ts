import Pagination from 'src/dto/pagination.dto';
import {
  IsString,
  IsNumberString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

class QueryCompanyDto extends Pagination {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  logo: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  website: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  size: number;
}

export default QueryCompanyDto;
