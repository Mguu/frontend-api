require('es6-promise').polyfill();

import axios from 'axios';

import $ from 'jquery';


export const FETCH_INITIAL_SESSION = 'FETCH_INITIAL_SESSION';

export const REQ_HAS_ERRORED = 'REQ_HAS_ERRORED';
export const REQ_IS_LOADING = 'REQ_IS_LOADING';
export const REQ_DATA_SUCCESS = 'REQ_DATA_SUCCESS';
export const MODAL_MESSAGE = 'MODAL_MESSAGE';

export const GET_CATALOG = 'GET_CATALOG';
export const GET_AGGREGATE = 'GET_AGGREGATE';

const Preloader = require('comps/Preloader.js');

const preloader = new Preloader();


export const http = axios.create({ baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://u4.startup-club.tech:' });

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
export const getCatalog = ({ searchInn = '', searchName = '', okved = '' }) => dispatch => {
  preloader.show();
  console.log('action get Catalog');
  http.get(`/catalog?inn=${searchInn}&name=${searchName}&okved=${okved}`)
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

export const getAgreggate = () => dispatch => {
  preloader.show();
  console.log('action get Catalog');
  http.get('/okvedstats')
    .then(resp => {
      preloader.remove();
      dispatch({
        type: GET_AGGREGATE,
        payload: resp.data
      });
    })
    .catch(error => {
      preloader.remove();
      console.warn(error);
    });
};

export const getVKData = (query, cb) => {
  /* preloader.show();
    console.log('action get Catalog');
    axios.defaults.crossDomain = true;
    http.get(`https://api.vk.com/method/users.search?q=${encodeURIComponent(query)}&fields=photo_50,contacts&sort=0&access_token=15ddaa2e468e337ec8187554a1a0a1623806d201a36e6b435b5fe1f0f3a4ff55e2f1e447a95ba54a62f90&v=V`)
      .then(resp => {
        preloader.remove();
        console.log('getVKData', resp);
        cb(null, resp);
      })
      .catch(error => {
        preloader.remove();
        console.warn(error);
        cb(error);
      });*/

  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: `https://api.vk.com/method/users.search?q=${encodeURIComponent(query)}&fields=photo_50,contacts&sort=0&access_token=15ddaa2e468e337ec8187554a1a0a1623806d201a36e6b435b5fe1f0f3a4ff55e2f1e447a95ba54a62f90&v=V`,
    success: res => { cb(null, res); },
    error: fail => { cb(fail); }
  });
};

