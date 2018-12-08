require('es6-promise').polyfill();

import axios from 'axios';


export const FETCH_INITIAL_SESSION = 'FETCH_INITIAL_SESSION';

export const REQ_HAS_ERRORED = 'REQ_HAS_ERRORED';
export const REQ_IS_LOADING = 'REQ_IS_LOADING';
export const REQ_DATA_SUCCESS = 'REQ_DATA_SUCCESS';
export const MODAL_MESSAGE = 'MODAL_MESSAGE';

export const GET_CATALOG = 'GET_CATALOG';

const Preloader = require('comps/Preloader.js');

const preloader = new Preloader();

let http;

if (process.env.NODE_ENV === 'development') {
  http = axios.create({baseURL: 'http://localhost:3000' });
  console.log('local dev');
} else {
  console.log('prod');
  http = axios.create({baseURL: 'http://u4.startup-club.tech' });
}


/*
* { message: "some message", isModal: true };
*/
export function showModalWindow(windowProps) {
  return {
    type: MODAL_MESSAGE,
    payload: windowProps
  };
}


/*
*
*/
export const getCatalog = () => dispatch => {
  preloader.show();
  console.log('action get Catalog');
  http.get('/catalog')
    .then(resp => {
      preloader.remove();
      dispatch({
        type: GET_CATALOG,
        payload: resp.data
      });
    })
    .catch(error => {
      preloader.remove();
      console.warn(error);
    });
};

