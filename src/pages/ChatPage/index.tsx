import { MainLayout } from "layouts";
import { Messages, Sender } from "./components";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "my-firebase";
import Paths from "constants/path";
import "./styles.modules.scss";

const ChatPage = () => {
  const [user] = useAuthState(auth);
  return !user ? (
    <Navigate to={Paths.LOGIN} replace />
  ) : (
    <MainLayout>
      <div className="container">
        <Messages />
        <Sender />
      </div>
    </MainLayout>
  );
};

export default ChatPage;
