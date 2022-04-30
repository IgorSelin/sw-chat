import { User } from "firebase/auth";
import { IMessage } from "types/chat.types";
import MessageItem from "./MessageItem";
import styles from "./styles.module.scss";

interface IMessages {
  messages: IMessage[];
  user: User | null | undefined;
}

const Messages = ({ messages, user }: IMessages) => {
  const sorted = messages.sort(
    (a, b) => (new Date(a.time) as any) - (new Date(b.time) as any)
  );
  return (
    <div className={styles.messages}>
      {sorted.map((item, i) => (
        <MessageItem key={i} info={item} user={user} />
      ))}
    </div>
  );
};

export default Messages;
