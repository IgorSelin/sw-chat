import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/hooks';
import { useDispatch } from 'react-redux';
import { MainLayout } from 'layouts';
import { loadPeopleDataRequestAction } from 'store/reducers/people/actions';
import Filter from './Filter';
import Paginator from './Paginator';
import TablePeople from './TablePeople';
import styles from './styles.module.scss';

const MainPage = () => {
  const { page, searchWord, data } = useAppSelector((state) => state.people);
  const [params, setParams] = useState({ page, searchWord });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPeopleDataRequestAction(params.page, params.searchWord));
  }, [params]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <Filter
          searchWord={searchWord}
          onChange={(value) =>
            setParams((prev) => ({ ...prev, page: 1, searchWord: value }))
          }
        />
        {data && (
          <Paginator
            count={data.count}
            page={page}
            onChange={(value) =>
              setParams((prev) => ({ ...prev, page: value }))
            }
          />
        )}
        <TablePeople />
      </div>
    </MainLayout>
  );
};

export default MainPage;
