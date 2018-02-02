import RequestStates from '../util/request-states';
import createAsyncRequest from '../util/async-redux';
import { getCountries } from '../clients/blood';

  const GET_COUNTRIES = 'countries::get';
  const LOADING_COUNTRIES = 'countries::loading';
  const FAILED_COUNTRIES = 'countries::failed';

const initialState = {
  countries: [],
  requestState: RequestStates.init
};

export default function countries(state = initialState, action) {
  let modified = Object.assign({}, state);

  console.log(action);

  switch (action.type) {
    case GET_COUNTRIES:
    console.log(action.payload);
      modified.countries = action.payload;
      modified.requestState = RequestStates.success;
      return modified;

    case LOADING_COUNTRIES:
      modified.countries = [];
      modified.requestState = RequestStates.loading;
      return modified;

    case FAILED_COUNTRIES:
      modified.countries = [];
      modified.requestState = RequestStates.failure;
      return modified;

    default:
      return modified;
  }

  return modified;
}

export const actions = {
  getCountries: () => createAsyncRequest({
    asyncRequest: getCountries.bind(null),
    payload: null,
    types: {
      success: GET_COUNTRIES,
      error: FAILED_COUNTRIES,
      request: LOADING_COUNTRIES
    }
  }),
};
