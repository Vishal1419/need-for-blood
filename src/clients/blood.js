import { doRequest, doJSONRequest, mockRequest } from '../util/request';
import countries from '../dummy-data/countries.json';

const bloodApiUrl = 'http://localhost:8888';
const USE_MOCK_CALLS_FOR_ALL_API = true;

export const getCountries = () => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: countries,
      isMock: true
    });
  }
  return doRequest(`${bloodApiUrl}/countries`, 'GET');
};

export const verifyPhone = (countryCode, mobileNo) => {
  const USE_MOCK = false;
  if(USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: { countryCode: countryCode, mobileNo: mobileNo },
      isMock: true
    });
  }
  return doJSONRequest(`${bloodApiUrl}/otpInfo/save`, 'POST', null, { countryCode: countryCode, mobileNo: mobileNo });
}

export const verifyOTP = (countryCode, mobileNo, otp) => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: { countryCode: countryCode, mobileNo: mobileNo, otpVerified: true },
      isMock: true
    });
  }
  return doJSONRequest(`${bloodApiUrl}/otp/verify`, 'POST', null, { countryCode: countryCode, mobileNo: mobileNo, otp: otp });
}