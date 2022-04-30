import { useEffect, useRef, useState } from "react";
import "./styles.modules.scss";

interface ISender {
  sendMessage(value: string): void;
  setKeyboardView(value: boolean): void;
}

const Sender = ({ sendMessage, setKeyboardView }: ISender) => {
  const [message, setMessage] = useState("");
  const [isOpenKeyboard, setOpenKeyboard] = useState(false);
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

  useEffect(() => {
    setKeyboardView(isOpenKeyboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenKeyboard]);

  return (
    <form className="sendContainer">
      <textarea
        onFocus={() => {
          setOpenKeyboard(true);
        }}
        onBlur={() => {
          setOpenKeyboard(false);
        }}
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
