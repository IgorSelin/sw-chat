import { User } from "firebase/auth";
import { IMessage } from "types/chat.types";
import { dateFormatter } from "utils/dateFormatter";
import styles from "./styles.module.scss";
import cn from "classnames";

interface IMessageItem {
  info: IMessage;
  user: User | null | undefined;
}

const MessageItem = ({ info, user }: IMessageItem) => {
  const isOwner = info.uid === user!.uid;

  return (
    <div className={cn(styles.messageItem, { [styles.owner]: isOwner })}>
      {!isOwner && (
        <div className={styles.leftSection}>
          <img src={info.photo} alt="avatar" className={styles.avatar} />
          <div className={styles.nameWithText}>
            <div>{info.name}</div>
            <div>{info.text}</div>
          </div>
        </div>
      )}
      <div className={styles.dateContainer}>
        {isOwner && <div>{info.text}</div>}
        <div className={styles.date}>{dateFormatter(info?.time)}</div>
      </div>
    </div>
  );
};

export default MessageItem;
