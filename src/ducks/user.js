import RequestStates from '../util/request-states';
import createAsyncRequest from '../util/async-redux';
import { getUser } from '../clients/blood';

const VERIFY_OTP = 'otp::verify::success';
const LOADING_VERIFY_OTP = 'otp::verify::loading';
const FAILED_VERIFY_OTP = 'otp::verify::failed';
const GET_USER = 'user::get::success';
const LOADING_GET_USER = 'user::get::loading';
const FAILED_GET_USER = 'user::get::failed';

const initialState = {
  user: {},
  requestState: RequestStates.init
};

export default function user(state = initialState, action) {
  let modified = Object.assign({}, state);

  switch (action.type) {
    case VERIFY_OTP:
      modified.user = action.payload.user;
      modified.requestState = RequestStates.success;
      return modified;

    case LOADING_VERIFY_OTP:
      modified.user = {};
      modified.requestState = RequestStates.loading;
      return modified;

    case FAILED_VERIFY_OTP:
      modified.user = {};
      modified.requestState = RequestStates.failure;
      return modified;

    default:
      return modified;
  }

  return modified;
}

export const actions = {
  getUser: () => createAsyncRequest({
    asyncRequest: getUser.bind(null),
    payload: null,
    types: {
      success: GET_USER,
      error: FAILED_GET_USER,
      request: LOADING_GET_USER
    }
  })
};
