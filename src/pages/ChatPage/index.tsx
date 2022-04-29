import { Messages, Sender } from "./components";
import "./styles.modules.scss";

const ChatPage = () => {
  return (
    <div className="container">
      <Messages />
      <Sender />
    </div>
  );
};

export default ChatPage;
