import { MainLayout } from "layouts";
import { Messages, Sender } from "./components";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { app, auth, db } from "my-firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Preloader } from "components";
import Paths from "constants/path";
import { IMessage } from "types/chat.types";
import styles from "./styles.module.scss";

const ChatPage = () => {
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(
    collection(getFirestore(app), "sw-chat")
  );

  const sendMessage = async (value: string) => {
    try {
      await addDoc(collection(db, "sw-chat"), {
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

  if (loading) return <Preloader />;

  return !user ? (
    <Navigate to={Paths.LOGIN} replace />
  ) : (
    <MainLayout>
      <div className={styles.container}>
        <Messages messages={messages as IMessage[]} user={user} />
        <Sender sendMessage={sendMessage} />
      </div>
    </MainLayout>
  );
};

export default ChatPage;
