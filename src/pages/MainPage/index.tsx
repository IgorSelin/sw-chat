import { useEffect, useState } from "react";
import { useAppSelector } from "hooks/hooks";
import { useDispatch } from "react-redux";
import { loadPeopleDataRequestAction } from "store/reducers/people/actions";
import Filter from "./Filter";
import Paginator from "./Paginator";
import TablePeople from "./TablePeople";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Paths from "constants/path";

const MainPage = () => {
  const { page, searchWord, data } = useAppSelector((state) => state.people);
  const [params, setParams] = useState({ page, searchWord });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPeopleDataRequestAction(params.page, params.searchWord));
  }, [dispatch, params, setParams]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Star wars documentation</div>
        <Link to={Paths.CONTACT_US}>Contact us</Link>
      </div>
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
          onChange={(value) => setParams((prev) => ({ ...prev, page: value }))}
        />
      )}
      <TablePeople />
    </div>
  );
};

export default MainPage;
