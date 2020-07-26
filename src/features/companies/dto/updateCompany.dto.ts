import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

class UpdateCompanyDto {
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

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  size: number;
}

export default UpdateCompanyDto;
