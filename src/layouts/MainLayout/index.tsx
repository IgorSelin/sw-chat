import { app, auth, logout } from 'my-firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Paths from 'constants/path';
import styles from './styles.module.scss';
import { ECollections } from 'constants/firebase';
import { collection, getFirestore } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const MainLayout = ({ children }: { children?: JSX.Element | null }) => {
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(
    collection(getFirestore(app), ECollections.lastMessages)
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navigation}>
          <div>
            <Link to={Paths.HOME}>Home</Link>
          </div>
          <div>
            {user ? (
              <>
                <Link to={Paths.USERS}>All users</Link>
                <Link to={Paths.MAIN_CHAT}>Main chat</Link>
                <Link to='' onClick={logout}>
                  Logout
                </Link>
              </>
            ) : (
              <Link to={Paths.LOGIN}>Login</Link>
            )}
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
