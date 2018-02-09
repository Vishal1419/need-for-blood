import { doRequest, doJSONRequest, mockRequest } from '../util/request';
import countries from '../dummy-data/countries.json';
import bloodGroups from '../dummy-data/bloodGroups.json';
import types from '../util/request-types';

const bloodApiUrl = 'http://localhost:8888';
const USE_MOCK_CALLS_FOR_ALL_API = false;

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
  return doRequest(`${bloodApiUrl}/otpInfo/save`, 'POST', null, { countryCode: countryCode, mobileNo: mobileNo }, types.json);
}

export const verifyOTP = (countryCode, mobileNo, otp) => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: { countryCode: countryCode, mobileNo: mobileNo, OTPVerified: true, user: {} },
      isMock: true
    });
  }
  return doRequest(`${bloodApiUrl}/otp/verify`, 'POST', null, { countryCode: countryCode, mobileNo: mobileNo, otp: otp }, types.json);
}

export const getBloodGroups = () => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: bloodGroups,
      isMock: true
    });
  }
  return doRequest(`${bloodApiUrl}/bloodGroups`, 'GET');
};

export const registerUser = (profilePicture, name, address, bloodGroup, countryCode, mobileNo) => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: { user: {} },
      isMock: true
    });
  }

  // if (profilePicture) {
  //   const imageUri = profilePicture;
  //   const imageName = imageUri.split('/').pop();

  //   // Infer the type of the image
  //   const match = /\.(\w+)$/.exec(imageName);
  //   const imageType = match ? `image/${match[1]}` : `image`;

  //   return doRequest(`${bloodApiUrl}/user/register`, 'POST', null, { profilePicture: { uri: imageUri, name: imageName, type: imageType}, name: name, address: address, bloodGroup: bloodGroup, countryCode: countryCode, mobileNo: mobileNo }, types.multipart);
  // }

  return doRequest(`${bloodApiUrl}/user/register`, 'POST', null, { profilePicture: profilePicture, name: name, address: address, bloodGroup: bloodGroup, countryCode: countryCode, mobileNo: mobileNo }, types.json);
}