import { useState } from "react";
import "./styles.modules.scss";

interface ISender {
  sendMessage(value: string): void;
}

const Sender = ({ sendMessage }: ISender) => {
  const [message, setMessage] = useState("");

  const submitMessageHandler = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <form className="sendContainer">
      <input
        onChange={({ target }) => setMessage(target.value)}
        value={message}
      />
      <button type="button" className="btn" onClick={submitMessageHandler}>
        Send
      </button>
    </form>
  );
};

export default Sender;
