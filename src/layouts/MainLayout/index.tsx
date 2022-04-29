import { auth, logout } from "my-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import Paths from "constants/path";
import styles from "./styles.module.scss";

const MainLayout = ({ children }: { children: JSX.Element }) => {
  const [user] = useAuthState(auth);

  return (
    <>
      <nav className={styles.navigation}>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to={Paths.CHAT}>Go to chat</Link>
            </li>
            <li>
              {!user ? (
                <Link to={Paths.LOGIN}>Login</Link>
              ) : (
                <Link to="" onClick={logout}>
                  Logout
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </>
  );
};

export default MainLayout;
