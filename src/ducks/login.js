import RequestStates from '../util/request-states';
import createAsyncRequest from '../util/async-redux';
import { verifyPhone, verifyOTP } from '../clients/blood';

const VERIFY_PHONE = 'phone::verify::success';
const LOADING_VERIFY_PHONE = 'phone::verify::loading';
const FAILED_VERIFY_PHONE = 'phone::verify::failed';
const VERIFY_OTP = 'otp::verify::success';
const LOADING_VERIFY_OTP = 'otp::verify::loading';
const FAILED_VERIFY_OTP = 'otp::verify::failed';

const initialState = {
  countryCode: '',
  mobileNo: '',
  otpVerified: false,
  requestState: RequestStates.init
};

export default function otp(state = initialState, action) {
  let modified = Object.assign({}, state);

  switch (action.type) {
    case VERIFY_PHONE:
      modified.countryCode = action.payload.countryCode;
      modified.mobileNo = action.payload.mobileNo;
      modified.requestState = RequestStates.success;
      return modified;

    case LOADING_VERIFY_PHONE:
      modified.countryCode = '';
      modified.mobileNo = '';
      modified.requestState = RequestStates.loading;
      return modified;

    case FAILED_VERIFY_PHONE:
      modified.countryCode = '';
      modified.mobileNo = '';
      modified.requestState = RequestStates.failure;
      return modified;

    case VERIFY_OTP:
      modified.otpVerified = action.payload.OTPVerified;
      modified.requestState = RequestStates.success;
      return modified;

    case LOADING_VERIFY_OTP:
      modified.otpVerified = false;
      modified.requestState = RequestStates.loading;
      return modified;

    case FAILED_VERIFY_OTP:
      modified.otpVerified = false;
      modified.requestState = RequestStates.failure;
      return modified;

    default:
      return modified;
  }

  return modified;
}

export const actions = {
  verifyPhone: (countryCode, mobileNo) => createAsyncRequest({
    asyncRequest: verifyPhone.bind(null, countryCode, mobileNo),
    payload: null,
    types: {
      success: VERIFY_PHONE,
      error: FAILED_VERIFY_PHONE,
      request: LOADING_VERIFY_PHONE
    }
  }),
  verifyOTP: (countryCode, mobileNo, otp) => createAsyncRequest({
    asyncRequest: verifyOTP.bind(null, countryCode, mobileNo, otp),
    payload: null,
    types: {
      success: VERIFY_OTP,
      error: FAILED_VERIFY_OTP,
      request: LOADING_VERIFY_OTP
    }
  })
};
