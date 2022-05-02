import { useEffect } from "react";
import styles from "./styles.module.scss";
import { auth, signInWithGoogle } from "my-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { HorizonalLoader } from "components";
import Paths from "constants/path";
import { MainLayout } from "layouts";

const LoginPage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate(Paths.MAIN_CHAT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <MainLayout>
      {loading ? (
        <HorizonalLoader />
      ) : (
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
      )}
    </MainLayout>
  );
};

export default LoginPage;
