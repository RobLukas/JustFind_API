import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

import { Address } from 'offices/types/address.types';
import { Geometry } from 'offices/types/geometry.types';

@Injectable()
export default class GeoCodeApiService {
  #geoCodeApiUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get('API_KEY_OPENCAGE_GEOCODE');
    this.#geoCodeApiUrl = `https://api.opencagedata.com/geocode/v1/json?pretty=1&no_annotations=1&limit=1&key=${apiKey}`;
  }

  private getQueryAddress(address: Address): string {
    const { city, street, postalCode, country } = address;
    const queryAddress = encodeURI(
      `&q=${street},${postalCode},${city},${country}`,
    );
    return queryAddress;
  }

  async getLatLongByAddress(address: Address): Promise<Geometry | null> {
    const getGeometryFromAddress: Geometry | null = await this.httpService
      .get(this.#geoCodeApiUrl + this.getQueryAddress(address))
      .pipe(
        map((response): Geometry | null => response.data.results[0].geometry),
      )
      .toPromise();

    return getGeometryFromAddress;
  }
}
