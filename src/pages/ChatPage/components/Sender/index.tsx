import { useEffect, useRef, useState } from "react";
import "./styles.modules.scss";

interface ISender {
  sendMessage(value: string): void;
}

const Sender = ({ sendMessage }: ISender) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const ref = textareaRef.current;

  const submitMessageHandler = () => {
    sendMessage(message);
    setMessage("");
    ref!.style.height = "36px";
  };

  useEffect(() => {
    const ref = textareaRef.current;
    if (ref) {
      const scrollHeight = ref.scrollHeight;
      ref.style.height = scrollHeight + "px";
    }
  }, [message]);

  return (
    <form className="sendContainer">
      <textarea
        ref={textareaRef}
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
