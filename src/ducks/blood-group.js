import RequestStates from '../util/request-states';
import createAsyncRequest from '../util/async-redux';
import { getBloodGroups } from '../clients/blood';

const GET_BLOOD_GROUPS = 'blood_groups::get';
const LOADING_BLOOD_GROUPS = 'blood_groups::loading';
const FAILED_BLOOD_GROUPS = 'blood_groups::failed';

const initialState = {
  bloodGroups: [],
  requestState: RequestStates.init
};

export default function bloodGroup(state = initialState, action) {
  let modified = Object.assign({}, state);

  switch (action.type) {
    case GET_BLOOD_GROUPS:
      modified.bloodGroups = action.payload.bloodGroups;
      modified.requestState = RequestStates.success;
      return modified;

    case LOADING_BLOOD_GROUPS:
      modified.bloodGroups = [];
      modified.requestState = RequestStates.loading;
      return modified;

    case FAILED_BLOOD_GROUPS:
      modified.bloodGroups = [];
      modified.requestState = RequestStates.failure;
      return modified;

    default:
      return modified;
  }

  return modified;
}

export const actions = {
  getBloodGroups: () => createAsyncRequest({
    asyncRequest: getBloodGroups.bind(null),
    payload: null,
    types: {
      success: GET_BLOOD_GROUPS,
      error: FAILED_BLOOD_GROUPS,
      request: LOADING_BLOOD_GROUPS
    }
  }),
};
