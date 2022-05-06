import { ELoadPeople } from './types';
import { IPeopleResponse } from 'services/people/types';

export const loadPeopleDataRequestAction = (page: number, searchWord: string) => ({
  type: ELoadPeople.request,
  payload: { page, searchWord }
});

export const loadPeopleDataSuccessAction = (data: IPeopleResponse) => ({
  type: ELoadPeople.success,
  payload: data
});
