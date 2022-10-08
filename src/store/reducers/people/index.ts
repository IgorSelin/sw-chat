import {
  ELoadPeople,
  loadPeopleActionTypes,
  IInitialPeopleState
} from 'store/reducers/people/types';

const initialState: IInitialPeopleState = {
  page: 1,
  searchWord: '',
  loading: false,
  error: '',
  data: {
    count: 0,
    results: []
  }
};

export const peopleReducer = (state = initialState, action: loadPeopleActionTypes) => {
  switch (action.type) {
    case ELoadPeople.request:
      const { page, searchWord } = action.payload;
      return {
        ...state,
        page,
        searchWord,
        loading: true
      };
    case ELoadPeople.success:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case ELoadPeople.faiture:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
