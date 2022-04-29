import { PersonDetails } from "services/people/types";
import { ELoadPerson } from "./types";

export const loadPersonDetailsRequestAction = (id: string) => {
  return {
    type: ELoadPerson.request,
    payload: id,
  };
};

export const loadPersonDetailsSuccessAction = (payload: PersonDetails) => {
  return {
    type: ELoadPerson.success,
    payload,
  };
};
