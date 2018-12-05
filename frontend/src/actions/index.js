require('es6-promise').polyfill();
import axios from 'axios';

import { appStore } from '../index';

//var errorWindow = require('common/comps/modals/ErrorWindow.js');

export const FETCH_INITIAL_SESSION = 'FETCH_INITIAL_SESSION';

export const REQ_HAS_ERRORED = 'REQ_HAS_ERRORED';
export const REQ_IS_LOADING = 'REQ_IS_LOADING';
export const REQ_DATA_SUCCESS = 'REQ_DATA_SUCCESS';

export const MODAL_MESSAGE = "MODAL_MESSAGE";
export const CHANGE_BUNNIES_AMOUNT_AT_ONCE = "CHANGE_BUNNIES_AMOUNT_AT_ONCE";
export const CHANGE_BUNNIES_AMOUNT = "CHANGE_BUNNIES_AMOUNT";



var Preloader = require('comps/Preloader.js'),
    preloader = new Preloader();


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
export function changeBunniesAmountAtOnce(numOfBunnies) {
    return {
        type: CHANGE_BUNNIES_AMOUNT_AT_ONCE,
        payload: numOfBunnies
    };
}

/*
* 
*/
export function changeBunniesAmount(numOfBunnies) {
    return {
        type: CHANGE_BUNNIES_AMOUNT,
        payload: numOfBunnies
    };
}


