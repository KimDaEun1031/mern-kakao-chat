import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import Axios from "axios";

import SideMenu from "./SideMenu";
import ChatModal from "./ChatModal";

import { BsChat, BsPlusLg } from "react-icons/bs";

const ChatListContainer = styled.div`
  display: flex;

  .chatListHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0 8px 15px;

    .chat {
      font-size: 20px;
      font-weight: bold;
    }

    .addChatRoomBtn {
      position: relative;
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;

      .addChatRoomIcon {
        padding-top: 5px;
        font-size: 22px;
      }

      .plusIcon {
        position: absolute;
        top: 12px;
        right: 2px;
        border-radius: 50px;
        font-size: 10px;
        background-color: white;
      }
    }
  }

  .chatRoomList {
    width: 320px;
  }

`;

function ChattingList() {
  const { state } = useLocation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  console.log(state);

  const { email, name, photo, chatList } = state.result;

  const createRoomHandler = async () => {
    // navigate("/chat")
    try {
      const result = await Axios.post("http://localhost:5000/chat/addroom");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const addChatModalOpenHandler = () => {
    setIsOpenModal(true);
  };

  const addChatModalCloseHandler = (result) => {
    setIsOpenModal(result);
  };

  return (
    <ChatListContainer>
      <SideMenu result={state.result} />
      <div>
        <div className="chatListHeader">
          <span className="chat">채팅</span>
          <button className="addChatRoomBtn" onClick={addChatModalOpenHandler}>
            <BsChat className="addChatRoomIcon"/>
            <BsPlusLg className="plusIcon"/>
          </button>
        </div>
        <button className="chatRoomList"></button>
      </div>
      {isOpenModal && <ChatModal email={email} closeHandler={addChatModalCloseHandler} />}
    </ChatListContainer>
  );
}

export default ChattingList;
