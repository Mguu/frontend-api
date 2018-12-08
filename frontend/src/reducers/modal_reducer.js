import { MODAL_MESSAGE } from '../actions/index';

const INITIAL_STATE = null;

export default function (state = INITIAL_STATE, action) {
    
    switch(action.type) {
        case MODAL_MESSAGE:
            return action.payload;

    }

    return state;
}
