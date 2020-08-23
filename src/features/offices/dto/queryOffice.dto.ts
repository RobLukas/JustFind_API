import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';
import Pagination from 'src/dto/pagination.dto';

class QueryOfficeDto extends Pagination {
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  street: string;
}

export default QueryOfficeDto;
