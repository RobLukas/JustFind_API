import { each, makeFactory } from 'factory.ts';
import * as faker from 'faker';
import { Geometry } from 'offices/types/geometry.types';

const geometryMockFactory = makeFactory<Geometry>({
  lat: each(() => Number(faker.address.latitude())),
  lng: each(() => Number(faker.address.longitude())),
});

export default geometryMockFactory;
