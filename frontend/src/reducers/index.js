import { combineReducers } from 'redux';

import ModalReducer from './modal_reducer';
import CatalogReducer from './catalog_reducer';
import AgreggateReducer from './agreggate_reducer';

const rootReducer = combineReducers({
  modalWindow: ModalReducer,
  catalog: CatalogReducer,
  agreggate: AgreggateReducer
});


export default rootReducer;
