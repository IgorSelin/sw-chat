import { PersonDetails } from "services/people/types";
export enum ELoadPerson {
  request = "LOAD_PERSON_DETAILS_REQUEST",
  success = "LOAD_PERSON_DETAILS_SUCCESS",
  failure = "LOAD_PERSON_DETAILS_FAILURE",
}

export interface loadPersonDetailsRequestType {
  type: ELoadPerson.request;
  payload: number;
}

export interface loadPersonDetailsSuccessType {
  type: ELoadPerson.success;
  payload: PersonDetails;
}

export interface loadPersonDetailsFailtureType {
  type: ELoadPerson.failure;
  payload: string;
}

export interface IInitialPersonState {
  loading: boolean;
  error: string;
  data: PersonDetails;
}

export type loadPersonTypes =
  | loadPersonDetailsRequestType
  | loadPersonDetailsSuccessType
  | loadPersonDetailsFailtureType;
