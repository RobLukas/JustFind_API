import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumberString,
} from 'class-validator';

class CreateCompanyDto {
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

  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(20)
  size: number;
}

export default CreateCompanyDto;
