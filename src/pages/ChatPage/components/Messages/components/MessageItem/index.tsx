import { forwardRef, useState } from "react";
import { User } from "firebase/auth";
import { IMessage } from "types/chat.types";
import { dateFormatter } from "utils/dateFormatter";
import { ImageLoader } from "components";
import styles from "./styles.module.scss";
import cn from "classnames";

interface IMessageItem {
  info: IMessage;
  user: User | null | undefined;
  ref: HTMLDivElement | null;
}

const MessageItem = forwardRef(({ info, user }: IMessageItem, ref) => {
  const { name, text, time, photo, file, uid: messageID } = info;

  const [selectedPhoto, setFullSize] = useState<string | null>(null);
  const isOwner = info.uid === user!.uid;

  const photoSection = () => (
    <div
      className={cn(styles.photoContainer, {
        [styles.fullSize]: selectedPhoto === info.uid,
      })}
      onClick={() => setFullSize((prev) => (prev ? null : messageID))}
    >
      <ImageLoader src={info.file} />
    </div>
  );

  return (
    <div
      className={cn(styles.messageItem, { [styles.owner]: isOwner })}
      ref={ref as React.ForwardedRef<HTMLDivElement>}
    >
      {!isOwner && (
        <div
          className={styles.leftSection}
          style={{ flexDirection: file ? "column" : "row" }}
        >
          <img src={photo} alt="avatar" className={styles.avatar} />
          <div>
            <div>{name}</div>
            <div className={styles.text}>{text}</div>
          </div>
          {file && photoSection()}
        </div>
      )}
      {isOwner && file && photoSection()}
      <div
        className={cn(styles.dateContainer, { [styles.ownerDate]: isOwner })}
      >
        {isOwner && <div className={styles.text}>{text}</div>}
        <div className={styles.date}>{dateFormatter(time)}</div>
      </div>
    </div>
  );
});

export default MessageItem;
