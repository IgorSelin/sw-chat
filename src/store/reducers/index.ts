import { combineReducers } from 'redux';
import { peopleReducer } from './people';
import { userDetailsReducer } from './userDetails';

const rootReducer = combineReducers({
  people: peopleReducer,
  userDetails: userDetailsReducer
});

export default rootReducer;
