import { PersonDetails } from 'services/people/types';
import { ELoadPerson } from './types';

export const loadPersonDetailsRequestAction = (id: string) => ({
  type: ELoadPerson.request,
  payload: id
});

export const loadPersonDetailsSuccessAction = (payload: PersonDetails) => ({
  type: ELoadPerson.success,
  payload
});
