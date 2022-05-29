import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BiX } from "react-icons/bi";

import io from "socket.io-client";

import Container from "../shared/Container";
import Button from "../shared/Button";
import Image from "../shared/Image";
import Ul from "../shared/Ul";

import { showChatView, addMessage, showList } from "../../features/chat/actions";
import Message from "./Message";

// css
const ChatContainer = styled(Container)`
  height: 550px;
  overflow: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none !important;
  }

  .somebody {
    text-align: left;
  }

  .me {
    text-align: right;
  }
`;

const ChatInputContainer = styled(Container)`
  height: 150px;
  display: flex;
  align-items: flex-start;
`;

const ChatUserInfo = styled.div`
  margin: 5px 10px;
  display: flex;
  justify-content: space-between;

  svg {
    width: 30px;
    height: 30px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-profile {
    display: flex;
    align-items: center;

    img {
      margin: 5px;
    }

    .user-name {
      font-size: 14px;
      font-weight: bold;
    }
  }

  button {
    margin: 5px;
    padding: 5px;
    border: 1px solid rgba(44, 44, 44, 0.2);
    border-radius: 10px;
  }
`;

const ChatInput = styled.textarea`
  width: 380px;
  height: 87%;
  padding: 10px;
  resize: none;
  border: none;
  outline: none;
  border-radius: 10px 0 0 10px;
`;

const SendButton = styled(Button)`
  margin: 9px 0 9px 15px;
  padding: 5px 10px;
  border: 1px solid rgba(44, 44, 44, 0.2);
  border-radius: 5px;
  background-color: rgba(255, 221, 93, 0.8);
  color: rgba(44, 44, 44, 0.9);

  &:hover {
    background-color: rgba(255, 221, 93);
  }
`;

// 소켓 연결
const socket = io.connect("http://localhost:5000");
// 서버 쪽으로 메세지 보내기
socket.emit("init", { name: "daeun" });

function Chat() {
  // 원래 있던 부분
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chatReducer);
  const nowDate = new Date().getTime();

  const [message, setMessage] = useState({
    id: 9953,
    content: '',
    timestamp: nowDate,
  });

  const { content } = message;

  const hideChatViewHandler = () => {
    dispatch(showList());
    dispatch(showChatView(null));
  };

  const changeInputHandler = (event) => {
    const {name, value} = event.target;

    setMessage({
      ...message,
      [name]: value
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(addMessage(message, chat.showChatData.chatRooms.id));

    setMessage({
      id: 9953,
      content: '',
      timestamp: nowDate,
    });
  };

  const sortMessages = chat.showChatData.chatMessages.sort((a, b) =>
    a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0
  );

  // 소켓 연결 종료
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <ChatUserInfo>
        <UserInfo>
          <div className="user-profile">
            <Image src={chat.showChatData.users.profile} />
            <span className="user-name">{chat.showChatData.users.name}</span>
          </div>
        </UserInfo>
        <Button
          onClick={hideChatViewHandler}
        >
          <BiX />
        </Button>
      </ChatUserInfo>
      <ChatContainer>
        <Ul>
          {sortMessages.map(item => (
            <Message key={item.timestamp} messageData={item} />
          ))}
        </Ul>
      </ChatContainer>
      <ChatInputContainer>
        <form onSubmit={submitHandler}>
          <ChatInput
            name="content"
            onChange={changeInputHandler}
            value={content}
          />
          <SendButton type="submit">전송</SendButton>
        </form>
      </ChatInputContainer>
    </div>
  );
}

export default Chat;
