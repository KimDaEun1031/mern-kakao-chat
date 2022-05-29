import React, { useState } from "react";
import styled from "styled-components";

import { BsFillChatFill, BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SideMenuContainer = styled.div`
  width: 65px;
  height: 700px;
  border-radius: 2px 0 0 2px;
  background-color: rgb(233, 233, 233);

  button {
    width: 100%;
    height: 60px;
    border: none;
    outline: none;
    font-size: 28px;
    color: rgb(179, 179, 179);
    background-color: transparent;
    cursor: pointer;
  }

  .friendBtn {
    margin-top: 30px;
  }

  .chatBtn {
    font-size: 22px;
  }

  .active {
    color: rgb(51, 51, 51);
  }
  `;

export default function SideMenu({ result }) {
  const navigate = useNavigate();
  const [isFriendBtn, setIsFriendBtn] = useState(true);

  const friendBtnHandler = () => {
    navigate("/friendlist", {
      state: { result }
    });
  };

  const chatBtnHandler = () => {
    navigate("/chatlist", {
      state: { result }
    });
  };

  return (
    <SideMenuContainer>
      <button
        className={"friendBtn" + (isFriendBtn ? " active" : "")}
        onClick={() => {
          friendBtnHandler();
          setIsFriendBtn(true);
        }}
      >
        <BsFillPersonFill />
      </button>
      <button
        className={"chatBtn" + (isFriendBtn ? "" : " active")}
        onClick={() => {
          chatBtnHandler();
          setIsFriendBtn(false);
        }}
      >
        <BsFillChatFill />
      </button>
    </SideMenuContainer>
  );
}
