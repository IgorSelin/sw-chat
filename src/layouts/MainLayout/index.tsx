import { auth, logout } from "my-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Paths from "constants/path";
import styles from "./styles.module.scss";

const MainLayout = ({ children }: { children?: JSX.Element | null }) => {
  
  const [user] = useAuthState(auth);

  return (
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
              <Link to="" onClick={logout}>
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
  );
};

export default MainLayout;
