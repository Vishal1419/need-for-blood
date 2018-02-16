import RequestStates from '../util/request-states';
import createAsyncRequest from '../util/async-redux';
import { checkIfAlreadyDonorInSameGroup, checkIfAlreadySeekerInSameGroup, donateBlood, seekBlood } from '../clients/blood';

const SELECT_BLOOD_CIRCULATION_TYPE = 'bloodCirculation::type::select';
const CHECK_IF_ALREADY_DONOR_IN_SAME_GROUP = 'donor::sameGroup::check';
const LOADING_CHECK_IF_ALREADY_DONOR_IN_SAME_GROUP = 'donor::sameGroup::check::loading';
const FAILED_CHECK_IF_ALREADY_DONOR_IN_SAME_GROUP = 'donor::sameGroup::check::failed';
const CHECK_IF_ALREADY_SEEKER_IN_SAME_GROUP = 'seeker::sameGroup::check';
const LOADING_CHECK_IF_ALREADY_SEEKER_IN_SAME_GROUP = 'seeker::sameGroup::check::loading';
const FAILED_CHECK_IF_ALREADY_SEEKER_IN_SAME_GROUP = 'seeker::sameGroup::check::failed';
const DONATE_BLOOD = 'blood::donate::success';
const LOADING_DONATE_BLOOD = 'blood::donate::loading';
const FAILED_DONATE_BLOOD = 'blood::donate::failed';
const SEEK_BLOOD = 'blood::seek::success';
const LOADING_SEEK_BLOOD = 'blood::seek::loading';
const FAILED_SEEK_BLOOD = 'blood::seek::failed';
const SELECT_BLOOD_CIRCULAR = 'blood::circular::select'

const initialState = {
  circulationType: 'DONATE',
  isDonorInSameGroup: false,
  isSeekerInSameGroup: false,
  seekersInRange: [],
  allSeekers: [],
  donorsInRange: [],
  allDonors: [],
  selectedBloodCircular: null,
  requestState: RequestStates.init
};

export default function bloodCirculation(state = initialState, action) {
  let modified = Object.assign({}, state);

  switch (action.type) {
    case SELECT_BLOOD_CIRCULATION_TYPE:
      modified.circulationType = action.payload;
      return modified;

    case CHECK_IF_ALREADY_DONOR_IN_SAME_GROUP:
      modified.isDonorInSameGroup = action.payload.isDonorInSameBloodGroup;
      modified.requestState = RequestStates.success;
      return modified;

    case LOADING_CHECK_IF_ALREADY_DONOR_IN_SAME_GROUP:
      modified.isDonorInSameGroup = false;
      modified.requestState = RequestStates.loading;
      return modified;

    case FAILED_CHECK_IF_ALREADY_DONOR_IN_SAME_GROUP:
      modified.isDonorInSameGroup = false;
      modified.requestState = RequestStates.failure;
      return modified;

    case CHECK_IF_ALREADY_SEEKER_IN_SAME_GROUP:
      modified.isSeekerInSameGroup = action.payload.isSeekerInSameBloodGroup;
      modified.requestState = RequestStates.success;
      return modified;

    case LOADING_CHECK_IF_ALREADY_SEEKER_IN_SAME_GROUP:
      modified.isSeekerInSameGroup = false;
      modified.requestState = RequestStates.loading;
      return modified;

    case FAILED_CHECK_IF_ALREADY_SEEKER_IN_SAME_GROUP:
      modified.isSeekerInSameGroup = false;
      modified.requestState = RequestStates.failure;
      return modified;

    case DONATE_BLOOD:
      modified.seekersInRange = action.payload.seekersInRange;
      modified.allSeekers = action.payload.allSeekers;
      modified.requestState = RequestStates.success;
      return modified;

    case LOADING_DONATE_BLOOD:
      modified.seekersInRange = [];
      modified.allSeekers = [];
      modified.requestState = RequestStates.loading;
      return modified;

    case FAILED_DONATE_BLOOD:
      modified.seekersInRange = [];
      modified.allSeekers = [];
      modified.requestState = RequestStates.failure;
      return modified;

    case SEEK_BLOOD:
    console.log(action.payload);
      modified.donorsInRange = action.payload.donorsInRange;
      modified.allDonors = action.payload.allDonors;
      modified.requestState = RequestStates.success;
      return modified;

    case LOADING_SEEK_BLOOD:
      modified.donorsInRange = [];
      modified.allDonors = [];
      modified.requestState = RequestStates.loading;
      return modified;

    case FAILED_SEEK_BLOOD:
      modified.donorsInRange = [];
      modified.allDonors = [];
      modified.requestState = RequestStates.failure;
      return modified;

    case SELECT_BLOOD_CIRCULAR:
      modified.selectedBloodCircular = action.payload;
      return modified;

    default:
      return modified;
  }

  return modified;
}

export const actions = {
  selectBloodCirculationType: (circulationType) => ({
    type: SELECT_BLOOD_CIRCULATION_TYPE,
    payload: circulationType
  }),
  checkIfAlreadyDonorInSameGroup: (bloodGroup, countryCode, mobileNo) => createAsyncRequest({
    asyncRequest: checkIfAlreadyDonorInSameGroup.bind(null, bloodGroup, countryCode, mobileNo),
    payload: null,
    types: {
      success: CHECK_IF_ALREADY_DONOR_IN_SAME_GROUP,
      error: FAILED_CHECK_IF_ALREADY_DONOR_IN_SAME_GROUP,
      request: LOADING_CHECK_IF_ALREADY_DONOR_IN_SAME_GROUP
    }
  }),
  checkIfAlreadySeekerInSameGroup: (bloodGroup, countryCode, mobileNo) => createAsyncRequest({
    asyncRequest: checkIfAlreadySeekerInSameGroup.bind(null, bloodGroup, countryCode, mobileNo),
    payload: null,
    types: {
      success: CHECK_IF_ALREADY_SEEKER_IN_SAME_GROUP,
      error: FAILED_CHECK_IF_ALREADY_SEEKER_IN_SAME_GROUP,
      request: LOADING_CHECK_IF_ALREADY_SEEKER_IN_SAME_GROUP
    }
  }),
  donateBlood: (bloodGroup, longitude, latitude, countryCode, mobileNo) => createAsyncRequest({
    asyncRequest: donateBlood.bind(null, bloodGroup, longitude, latitude, countryCode, mobileNo),
    payload: null,
    types: {
      success: DONATE_BLOOD,
      error: FAILED_DONATE_BLOOD,
      request: LOADING_DONATE_BLOOD
    }
  }),
  seekBlood: (bloodGroup, longitude, latitude, countryCode, mobileNo) => createAsyncRequest({
    asyncRequest: seekBlood.bind(null, bloodGroup, longitude, latitude, countryCode, mobileNo),
    payload: null,
    types: {
      success: SEEK_BLOOD,
      error: FAILED_SEEK_BLOOD,
      request: LOADING_SEEK_BLOOD
    }
  }),
  selectBloodCircular: (bloodCircular) => ({
    type: SELECT_BLOOD_CIRCULAR,
    payload: bloodCircular
  })
};
