import { GET_AGGREGATE } from '../actions/index';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {

  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_AGGREGATE:
      return action.payload;

  }

  return state;
}
