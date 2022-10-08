import * as eff from 'redux-saga/effects';
import { ELoadPeople, loadPeopleRequest } from 'store/reducers/people/types';
import { ELoadPerson, loadPersonDetailsRequestType } from 'store/reducers/userDetails/types';
import * as Enpdoints from 'services/people/people.endpoints';
import * as PersonAction from 'store/reducers/userDetails/actions';
import * as LoadPeopleAction from 'store/reducers/people/actions';
import { IPeopleResponse } from 'services/people/types';

export function* loadPersonDetails(action: loadPersonDetailsRequestType) {
  const id = action.payload;
  const { data } = yield eff.call(Enpdoints.loadPerson, id);
  yield eff.put(PersonAction.loadPersonDetailsSuccessAction(data));
}

export function* loadPeopleList(action: loadPeopleRequest) {
  const { page, searchWord } = action.payload;
  try {
    const { data }: { data: IPeopleResponse } = yield eff.call(
      Enpdoints.loadPeople,
      page,
      searchWord
    );
    yield eff.put(LoadPeopleAction.loadPeopleDataSuccessAction(data));
  } catch (e) {
    console.log(e);
  }
}
export function* peopleSaga() {
  yield eff.all([
    eff.takeEvery(ELoadPerson.request, loadPersonDetails),
    eff.takeEvery(ELoadPeople.request, loadPeopleList)
  ]);
}
