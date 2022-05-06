import { useState } from 'react';
import { MainLayout } from 'layouts';
import { Messages, Sender } from './components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useParams } from 'react-router-dom';
import { app, auth, db } from 'my-firebase';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { BasicLoader, HorizonalLoader } from 'components';
import { IMessage } from 'types/chat.types';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { ECollections } from 'constants/firebase';
import styles from './styles.module.scss';
import Paths from 'constants/path';

const ChatPage = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [photoLoading, setPhotoLoading] = useState(false);
  const [messages, loading] = useCollectionData(
    collection(getFirestore(app), id || ECollections.Main)
  );

  const sendMessage = async (value: string) => {
    try {
      await addDoc(collection(db, id || ECollections.Main), {
        name: user?.displayName,
        text: value,
        time: new Date().toISOString(),
        photo: user?.photoURL,
        uid: user?.uid
      });
    } catch (err) {
      console.error(err);
    }
  };

  const uploadPhoto = (value: File) => {
    setPhotoLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, value.name);
    uploadBytes(storageRef, value).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        addDoc(collection(db, id || ECollections.Main), {
          name: user?.displayName,
          time: new Date().toISOString(),
          file: url,
          photo: user?.photoURL,
          uid: user?.uid
        }).then(() => {
          setPhotoLoading(false);
        });
      });
    });
  };

  if (!user) {
    return <Navigate to={Paths.LOGIN} />;
  }

  return (
    <MainLayout>
      {loading ? (
        <div className={styles.mainLoader}>
          <HorizonalLoader />
        </div>
      ) : (
        <div className={styles.container}>
          {photoLoading && (
            <div className={styles.loaderContainer}>
              <BasicLoader />
            </div>
          )}
          <Messages messages={messages as IMessage[]} user={user} />
          <Sender sendMessage={sendMessage} getPhoto={uploadPhoto} photoLoading={photoLoading} />
        </div>
      )}
    </MainLayout>
  );
};

export default ChatPage;
