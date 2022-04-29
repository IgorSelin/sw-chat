import { useState } from "react";
import "./styles.modules.scss";

const Sender = () => {
  const [message, setMessage] = useState("");
  return (
    <form className="sendContainer">
      <input
        onChange={({ target }) => setMessage(target.value)}
        value={message}
      />
      <button type="button" className="btn">
        Send
      </button>
    </form>
  );
};

export default Sender;
