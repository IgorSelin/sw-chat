import React from "react";
import "./styles.modules.scss";

const MessageItem = ({ message }: any) => {
  return (
    <div className="messageItem">
      <div>
        {message?.userName}:{message?.message}
      </div>
      <div>{`${new Date().getHours()}:${new Date().getMinutes()}`}</div>
    </div>
  );
};

export default MessageItem;
