import { IPeopleResponse } from 'services/people/types';

export enum ELoadPeople {
  request = 'LOAD_PEOPLE_REQUEST',
  success = 'LOAD_PEOPLE_SUCCESS',
  faiture = 'LOAD_PEOPLE_FAILURE'
}

export interface loadPeopleRequest {
  type: ELoadPeople.request;
  payload: { page: number; searchWord: string };
}

export interface loadPeopleSuccess {
  type: ELoadPeople.success;
  payload: IPeopleResponse;
}

export interface loadPeopleFailure {
  type: ELoadPeople.faiture;
  payload: string;
}

export interface IInitialPeopleState {
  page: number;
  searchWord: string;
  loading: boolean;
  error: string;
  data: IPeopleResponse | null;
}

export type loadPeopleActionTypes = loadPeopleRequest | loadPeopleSuccess | loadPeopleFailure;
