import { combineReducers } from 'redux';

import ModalReducer from './modal_reducer';


const rootReducer = combineReducers({
    modalWindow: ModalReducer
});


export default rootReducer;
