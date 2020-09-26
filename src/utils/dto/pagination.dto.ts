import { IsOptional, IsNotEmpty, IsNumberString } from 'class-validator';

class PaginationDto {
  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  limit: number;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  offset: number;
}

export default PaginationDto;
