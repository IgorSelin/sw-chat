import axios, { AxiosResponse } from "axios";
import { IPeopleResponse } from "./types";

export const loadPerson = (
  id: number
): Promise<AxiosResponse<IPeopleResponse>> => {
  return axios.get(`https://swapi.dev/api/people/${id}`);
};

export const loadPeople = (
  page: number,
  searchWord: string
): Promise<AxiosResponse<IPeopleResponse>> => {
  return axios.get(
    `https://swapi.dev/api/people?page=${page}&search=${searchWord}`
  );
};
