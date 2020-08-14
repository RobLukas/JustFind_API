import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import Pagination from 'src/dto/pagination.dto';

class QueryOfficeDto extends Pagination {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  street: string;
}

export default QueryOfficeDto;
