import { User } from "firebase/auth";
import { useRef, useEffect } from "react";
import { IMessage } from "types/chat.types";
import MessageItem from "./MessageItem";
import styles from "./styles.module.scss";

interface IMessages {
  messages: IMessage[];
  user: User | null | undefined;
}

const Messages = ({ messages, user }: IMessages) => {
  const container = useRef<HTMLDivElement>(null);
  const last = useRef<HTMLDivElement>(null);

  const getFocus = () => {
    setTimeout(() => {
      if (last.current) {
        last.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500);
  };

  useEffect(getFocus, [messages]);

  const sorted = messages.sort(
    (a, b) => (new Date(a.time) as any) - (new Date(b.time) as any)
  );
  return (
    <div className={styles.messages} ref={container}>
      {sorted.map((item, i) => (
        <MessageItem
          key={i}
          info={item}
          user={user}
          ref={sorted[sorted.length - 1] === sorted[i] ? last : null}
        />
      ))}
    </div>
  );
};

export default Messages;
