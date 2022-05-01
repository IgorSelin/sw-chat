import { forwardRef, useState } from "react";
import { User } from "firebase/auth";
import { IMessage } from "types/chat.types";
import { dateFormatter } from "utils/dateFormatter";
import styles from "./styles.module.scss";
import cn from "classnames";

interface IMessageItem {
  info: IMessage;
  user: User | null | undefined;
  ref: HTMLDivElement | null;
}

const MessageItem = forwardRef(({ info, user }: IMessageItem, ref) => {
  const [selectedPhoto, setFullSize] = useState<string | null>(null);
  const isOwner = info.uid === user!.uid;

  return (
    <div
      className={cn(styles.messageItem, { [styles.owner]: isOwner })}
      ref={ref as React.ForwardedRef<HTMLDivElement>}
    >
      {!isOwner && (
        <div className={styles.leftSection}>
          <img src={info.photo} alt="avatar" className={styles.avatar} />
          <div>
            <div>{info.name}</div>
            <div className={styles.text}>{info.text}</div>
          </div>
        </div>
      )}
      {info.file && (
        <div
          className={styles.photoContainer}
          onClick={() => setFullSize((prev) => (prev ? null : info.uid))}
        >
          <img
            src={info.file}
            className={cn({ [styles.fullSize]: selectedPhoto === info.uid })}
            alt="upload"
          />
        </div>
      )}
      <div
        className={cn(styles.dateContainer, { [styles.ownerDate]: isOwner })}
      >
        {isOwner && <div className={styles.text}>{info.text}</div>}
        <div className={styles.date}>{dateFormatter(info?.time)}</div>
      </div>
    </div>
  );
});

export default MessageItem;
