import { IsOptional, IsNotEmpty, IsNumberString } from 'class-validator';

class Pagination {
  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  limit: number;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  offset: number;
}

export default Pagination;
