import Paths from "constants/path";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import { app, auth, db } from "my-firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { HorizonalLoader } from "components";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ECollections } from "constants/firebase";
import { MainLayout } from "layouts";
import styles from "./styles.module.scss";

const AllUsers = () => {
  const [user] = useAuthState(auth);
  const [mainLoading, setMainLoading] = useState(false);
  const [users, loading] = useCollectionData(
    collection(getFirestore(app), ECollections.Users)
  );
  const [relations] = useCollectionData(
    collection(getFirestore(app), ECollections.Relations)
  );
  const navigate = useNavigate();

  const addRelHandler = async (value: string) => {
    setMainLoading(true);

    const candidate = relations?.find(
      ({ pair }) => pair.includes(value) && pair.includes(user?.uid)
    );
    if (candidate) {
      navigate(`/chat/${candidate.path}`);
    } else {
      const id = uuidv4();
      await addDoc(collection(db, ECollections.Relations), {
        pair: [user?.uid, value],
        path: id,
      });
      navigate(`/chat/${id}`);
    }
  };

  return (
    <MainLayout>
      {loading && !mainLoading ? (
        <HorizonalLoader />
      ) : (
        <div className={styles.container}>
          {!user ? (
            <Navigate to={Paths.LOGIN} replace />
          ) : (
            <>
              <div className={styles.title}>Users:</div>
              <div className={styles.usersContainer}>
                {users
                  ?.filter(({ uid }: any) => uid !== user?.uid)
                  .map((u: any, i: number) => (
                    <div
                      key={i}
                      onClick={() => addRelHandler(u.uid)}
                      className={styles.userItem}
                    >
                      <div>
                      {true ? (
                        <i className="material-icons">person</i>
                      ) : (
                        <img className={styles.avatar} src={""} alt="" />
                      )}
                      {u.name}
                      </div>
                      <i className="material-icons">message</i>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default AllUsers;
