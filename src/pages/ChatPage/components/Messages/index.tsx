import React from "react";
import MessageItem from "./MessageItem";

const Messages = ({ messages }: any) => {
  return (
    <div className="messages">
      {Array(5)
        .fill("")
        .map((item: any, i: number) => (
          <MessageItem key={i} item={item} />
        ))}
    </div>
  );
};

export default Messages;
