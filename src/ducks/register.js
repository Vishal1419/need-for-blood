import RequestStates from '../util/request-states';
import createAsyncRequest from '../util/async-redux';
import { registerUser } from '../clients/blood';

const REGISTER_USER = 'user::register::success';
const LOADING_REGISTER_USER = 'user::register::loading';
const FAILED_REGISTER_USER = 'user::register::failed';

const initialState = {
  requestState: RequestStates.init
};

export default function register(state = initialState, action) {
  let modified = Object.assign({}, state);

  switch (action.type) {
    case REGISTER_USER:
      modified.requestState = RequestStates.success;
      return modified;

    case LOADING_REGISTER_USER:
      modified.requestState = RequestStates.loading;
      return modified;

    case FAILED_REGISTER_USER:
      modified.requestState = RequestStates.failure;
      return modified;

    default:
      return modified;
  }

  return modified;
}

export const actions = {
  registerUser: (profilePicture, name, address, bloodGroup, countryCode, mobileNo) => createAsyncRequest({
    asyncRequest: registerUser.bind(null, profilePicture, name, address, bloodGroup, countryCode, mobileNo),
    payload: null,
    types: {
      success: REGISTER_USER,
      error: FAILED_REGISTER_USER,
      request: LOADING_REGISTER_USER
    }
  }),
};
