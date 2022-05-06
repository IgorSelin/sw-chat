import { PersonDetails } from 'services/people/types';
import { ELoadPerson, IInitialPersonState, loadPersonTypes } from './types';

const initialState: IInitialPersonState = {
  loading: false,
  error: '',
  data: {} as PersonDetails
};

export const userDetailsReducer = (state = initialState, action: loadPersonTypes) => {
  switch (action.type) {
    case ELoadPerson.request:
      return {
        ...state,
        loading: true
      };

    case ELoadPerson.success:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case ELoadPerson.failure:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
