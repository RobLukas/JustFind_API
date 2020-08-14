import { IsString, IsNotEmpty, MaxLength, IsUUID } from 'class-validator';

class UpdateOfficeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  street: string;

  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}

export default UpdateOfficeDto;
