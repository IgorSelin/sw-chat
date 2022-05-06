import Paths from 'constants/path';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app, auth, db } from 'my-firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HorizonalLoader } from 'components';
import { Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { chatPath, ECollections } from 'constants/firebase';
import { MainLayout } from 'layouts';
import styles from './styles.module.scss';

const AllUsers = () => {
  const [user] = useAuthState(auth);
  const [users, loading] = useCollectionData(collection(getFirestore(app), ECollections.Users));
  const [relations] = useCollectionData(collection(getFirestore(app), ECollections.Relations));
  const navigate = useNavigate();

  const addRelHandler = async (value: string) => {
    const candidate = relations?.find(
      ({ pair }) => pair.includes(value) && pair.includes(user?.uid)
    );
    if (candidate) {
      navigate(chatPath(candidate.path));
    } else {
      const id = uuidv4();
      await addDoc(collection(db, ECollections.Relations), {
        pair: [user?.uid, value],
        path: id
      });
      navigate(chatPath(id));
    }
  };

  return (
    <MainLayout>
      {loading ? (
        <HorizonalLoader />
      ) : (
        <div className={styles.container}>
          {user ? (
            <>
              <div className={styles.title}>Users:</div>
              <div className={styles.usersContainer}>
                {users
                  ?.filter(({ uid }) => uid !== user?.uid)
                  .map(({ uid: id, name, photo }) => (
                    <div key={id} onClick={() => addRelHandler(id)} className={styles.userItem}>
                      <div>
                        {photo ? (
                          <img className={styles.avatar} src={photo} alt='' />
                        ) : (
                          <i className='material-icons'>person</i>
                        )}
                        {name}
                      </div>
                      <i className='material-icons'>message</i>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            <Navigate to={Paths.LOGIN} replace />
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default AllUsers;
