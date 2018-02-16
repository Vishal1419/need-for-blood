import { SERVER_URL } from '../config/server';
import { socket } from '../config/sockets';
import { doRequest, doJSONRequest, mockRequest } from '../util/request';
import countries from '../dummy-data/countries.json';
import bloodGroups from '../dummy-data/bloodGroups.json';
import types from '../util/request-types';

const USE_MOCK_CALLS_FOR_ALL_API = false;

export const getCountries = () => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: countries,
      isMock: true
    });
  }
  return doRequest(`${SERVER_URL}/countries`, 'GET');
};

export const verifyPhone = (countryCode, mobileNo) => {
  const USE_MOCK = false;
  if(USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: { countryCode: countryCode, mobileNo: mobileNo },
      isMock: true
    });
  }
  return doRequest(`${SERVER_URL}/otpInfo/save`, 'POST', null, { countryCode: countryCode, mobileNo: mobileNo }, types.json);
}

export const verifyOTP = (countryCode, mobileNo, otp) => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: { countryCode: countryCode, mobileNo: mobileNo, OTPVerified: true, user: {} },
      isMock: true
    });
  }
  return doRequest(`${SERVER_URL}/otp/verify`, 'POST', null, { countryCode: countryCode, mobileNo: mobileNo, otp: otp }, types.json);
}

export const getBloodGroups = () => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: bloodGroups,
      isMock: true
    });
  }
  return doRequest(`${SERVER_URL}/bloodGroups`, 'GET');
};

export const registerUser = (profilePicture, name, address, bloodGroup, countryCode, mobileNo) => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: { user: {} },
      isMock: true
    });
  }

  return doRequest(`${SERVER_URL}/user/register`, 'POST', null, { profilePicture: profilePicture, name: name, address: address, bloodGroup: bloodGroup, countryCode: countryCode, mobileNo: mobileNo }, types.json);
}

export const checkIfAlreadyDonorInSameGroup = (bloodGroup, countryCode, mobileNo) => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: false,
      isMock: true
    });
  }

  return doRequest(`${SERVER_URL}/user/checkIfDonorInSameGroup`, 'POST', null, { bloodGroup: bloodGroup, countryCode: countryCode, mobileNo: mobileNo }, types.json);
}

export const checkIfAlreadySeekerInSameGroup = (bloodGroup, countryCode, mobileNo) => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: false,
      isMock: true
    });
  }

  return doRequest(`${SERVER_URL}/user/checkIfSeekerInSameGroup`, 'POST', null, { bloodGroup: bloodGroup, countryCode: countryCode, mobileNo: mobileNo }, types.json);
}

export const donateBlood = (bloodGroup, longitude, latitude, countryCode, mobileNo) => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: null,
      isMock: true
    });
  }

  return doRequest(`${SERVER_URL}/user/donate`, 'POST', null, { bloodGroup: bloodGroup, countryCode: countryCode, mobileNo: mobileNo, longitude: longitude, latitude: latitude }, types.json);
}

export const seekBlood = (bloodGroup, longitude, latitude, countryCode, mobileNo) => {
  const USE_MOCK = false;
  if (USE_MOCK_CALLS_FOR_ALL_API || USE_MOCK) {
    return mockRequest({
      payload: null,
      isMock: true
    });
  }

  return doRequest(`${SERVER_URL}/user/seek`, 'POST', null, { bloodGroup: bloodGroup, countryCode: countryCode, mobileNo: mobileNo, longitude: longitude, latitude: latitude }, types.json);
}