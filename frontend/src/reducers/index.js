import { combineReducers } from 'redux';

import ModalReducer from './modal_reducer';
import CatalogReducer from './catalog_reducer';

const rootReducer = combineReducers({
  modalWindow: ModalReducer,
  catalog: CatalogReducer
});


export default rootReducer;
