export const getLatLong = (
  geoCodeApiKey: string,
  street: string,
  city: string,
  postalCode: string,
  country: string,
): string =>
  `https://api.opencagedata.com/geocode/v1/json?key=${geoCodeApiKey}&q=${street}, ${postalCode}, ${city}, ${country}&pretty=1&no_annotations=1&limit=1`;

