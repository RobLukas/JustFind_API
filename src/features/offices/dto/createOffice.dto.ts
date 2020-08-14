import {
  IsDefined,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsUUID,
} from 'class-validator';

class CreateOfficeDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  city: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  street: string;

  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}

export default CreateOfficeDto;
