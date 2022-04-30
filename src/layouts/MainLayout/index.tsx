import { auth, logout } from "my-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Paths from "constants/path";
import styles from "./styles.module.scss";

const MainLayout = ({ children }: { children: JSX.Element }) => {
  const [user] = useAuthState(auth);

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <Link to={Paths.HOME}>Home</Link>
        <Link to={Paths.CHAT}>Go to chat</Link>
        {!user ? (
          <Link to={Paths.LOGIN}>Login</Link>
        ) : (
          <Link to="" onClick={logout}>
            Logout
          </Link>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MainLayout;
