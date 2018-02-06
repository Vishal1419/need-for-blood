import axios from 'axios';
import manipulator from 'object-formdata-convertor';
import store from '../ducks/store';

export const mockRequest = (result) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve.bind(null, result), 1000);
  });
};

export const doRequest = (url, method, token = null, body = {}) => {
  let options = {
    method: method,
    headers: {}
  };
  if (!['GET', 'HEAD'].includes(method)) {
    options.body = manipulator.JsonToFormData(body);
  }

  if (token !== null) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  return fetch(url, options);
};

export const doJSONRequest = (url, method, token = null, body = {}) => {
  let options = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  };
  if (token !== null) {
    options.headers.Authorization = `Bearer ${token}`;
  }
  return fetch(url, options);
};
