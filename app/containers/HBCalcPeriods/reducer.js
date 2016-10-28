/*
 * HypoBoxCalculatorReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  ADD_PERIOD,
  REMOVE_PERIOD,
  PERIOD_FORM_CHANGED,
} from './constants';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  periods: fromJS([
    fromJS({
      vyska: 65000,
      dlzka: 25,
      dlzkaSkutocne: 3,
      urok: 1.79,
    }),
  ]),
});

function calcPeriodsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PERIOD:
      return state.set('periods', state.get('periods', fromJS([])).push(fromJS(action.payload.data)));
    case REMOVE_PERIOD:
      return state.deleteIn(['periods', action.payload.id]);
    case PERIOD_FORM_CHANGED:
      return state.mergeIn(['periods', action.payload.id], action.payload.data);
    default:
      return state;
  }
}

export default calcPeriodsReducer;
