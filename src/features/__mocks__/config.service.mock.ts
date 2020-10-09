const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'API_KEY_OPENCAGE_GEOCODE':
        return 'api_key_uuid';
    }
  },
};

export default mockedConfigService;
