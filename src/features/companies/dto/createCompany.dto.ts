import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumberString,
  IsDefined,
} from 'class-validator';

class CreateCompanyDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  logo: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  website: string;

  @IsDefined()
  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(20)
  size: number;
}

export default CreateCompanyDto;
