import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import countries from './countries';
import login from './login';
import user from './user';
import bloodGroup from './blood-group';
import register from './register';
import bloodCirculation from './blood-circulation';

/* global window */
/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }] */
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    form: formReducer,
    countries: countries,
    login: login,
    user: user,
    bloodGroup: bloodGroup,
    register: register,
    bloodCirculation: bloodCirculation
  }),
  undefined,
  compose(
    applyMiddleware(ReduxThunk)
  )
);

export default store;
