import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { timeStampToDate } from "../../common/utils";

const MessageStyle = styled.li`
  margin: 10px;

  p {
    margin: 0;
  }

  .user-name {
    margin: 5px;
    font-size: 14px;
  }

  .chat-content {
    display: inline-block;
    padding: 5px;
    border: 1px solid rgba(44, 44, 44, 0.2);
    border-radius: 50px;
  }

  .send-time {
    margin: 5px 10px 5px 10px;
    font-size: 12px;
  }
`;

function Message({ messageData }) {
  const chat = useSelector(state => state.chatReducer);
  const user = chat.chatAllData.users.byIds[messageData.id];

  return (
    <MessageStyle className={user.id !== 9953 ? 'somebody' : 'me'}>
      <p className="user-name">{user.id !== 9953 ? user.name : ''}</p>
      <p className="chat-content">{messageData.content}</p>
      <p className="send-time">{timeStampToDate(messageData.timestamp)}</p>
    </MessageStyle>
  );
}

export default Message;
