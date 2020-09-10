import { IsLatitude, IsLongitude } from 'class-validator';

class GeometryDto {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}

export default GeometryDto;
