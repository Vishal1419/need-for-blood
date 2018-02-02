import { doRequest, mockRequest } from '../util/request';
import countries from '../dummy-data/countries.json';

const bloodApiUrl = 'http://localhost:8080/api';
const USE_MOCK_CALLS_FOR_ALL_API = true;

export const getCountries = () => {
  const USE_MOCK = true;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: countries,
      isMock: true
    });
  }
  return doRequest(`${bloodApiUrl}/countries`, 'GET');
};
