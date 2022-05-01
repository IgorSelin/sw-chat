import { MainLayout } from "layouts";
import { Messages, Sender } from "./components";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { app, auth, db } from "my-firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BasicLoader, HorizonalLoader } from "components";
import Paths from "constants/path";
import { IMessage } from "types/chat.types";
import styles from "./styles.module.scss";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ECollections } from "constants/firebase";
import { useState } from "react";

const ChatPage = () => {
  const [user] = useAuthState(auth);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [messages, loading] = useCollectionData(
    collection(getFirestore(app), ECollections.Main)
  );

  const sendMessage = async (value: string) => {
    try {
      await addDoc(collection(db, ECollections.Main), {
        name: user!.displayName,
        text: value,
        time: new Date().toISOString(),
        photo: user!.photoURL,
        uid: user?.uid,
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  async function uploadPhoto(value: File) {
    setPhotoLoading(true);
    if (value.name) {
      const storage = getStorage();
      const storageRef = ref(storage, value.name);
      uploadBytes(storageRef, value).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addDoc(collection(db, ECollections.Main), {
            name: user!.displayName,
            time: new Date().toISOString(),
            file: url,
            photo: user!.photoURL,
            uid: user?.uid,
          }).then(() => {
            setPhotoLoading(false);
          });
        });
      });
    }
  }
  if (loading) return <HorizonalLoader />;

  return !user ? (
    <Navigate to={Paths.LOGIN} replace />
  ) : (
    <MainLayout>
      <div className={styles.container}>
        {photoLoading && (
          <div className={styles.loaderContainer}>
            <BasicLoader />
          </div>
        )}
        <Messages messages={messages as IMessage[]} user={user} />
        <Sender
          sendMessage={sendMessage}
          getPhoto={uploadPhoto}
          photoLoading={photoLoading}
        />
      </div>
    </MainLayout>
  );
};

export default ChatPage;
