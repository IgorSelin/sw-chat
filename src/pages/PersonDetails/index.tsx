import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadPersonDetailsRequestAction } from 'store/reducers/userDetails/actions';
import { useAppSelector } from 'hooks/hooks';
import { useParams } from 'react-router-dom';
import { HorizonalLoader } from 'components';
import { MainLayout } from 'layouts';
import { linkItems } from './constants';
import styles from './styles.module.scss';

const PersonDetails = () => {
  const { data, loading } = useAppSelector((s) => s.userDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadPersonDetailsRequestAction(id as string));
  }, [id]);

  return (
    <MainLayout>
      {loading ? (
        <HorizonalLoader />
      ) : (
        <div className={`row ${styles.container}`}>
          <h4 className={styles.title}>{data.name}</h4>
          <ul className='collection'>
            {Object.entries(data).map(([key, val]) =>
              val.length > 0 ? (
                <li key={key} className='collection-item'>
                  <span className={styles.tableKeys}>
                    {key.replaceAll('_', ' ')}
                  </span>
                  :{' '}
                  {linkItems.includes(key) ? (
                    <a href={typeof val === 'string' ? val : val[0]}>link to</a>
                  ) : (
                    val
                  )}
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </MainLayout>
  );
};

export default PersonDetails;
