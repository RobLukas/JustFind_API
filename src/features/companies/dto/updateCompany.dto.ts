import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

class UpdateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  logo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  website: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;
}

export default UpdateCompanyDto;
