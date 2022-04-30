import { useEffect } from "react";
import styles from "./styles.module.scss";
import { auth, signInWithGoogle } from "my-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Preloader } from "components";
import Paths from "constants/path";

const LoginPage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      <Preloader />;
    }
    if (user) navigate(Paths.CHAT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <button
          className={`btn ${styles.logWithGoogleBtn}`}
          type="button"
          onClick={signInWithGoogle}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
