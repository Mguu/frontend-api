import { GET_CATALOG } from '../actions/index';

const INITIAL_STATE = { data: [], rowCount: 100 };

export default function (state = INITIAL_STATE, action) {

  // eslint-disable-next-line default-case
  switch (action.type) {
    case GET_CATALOG:
      return action.payload;

  }

  return state;
}
