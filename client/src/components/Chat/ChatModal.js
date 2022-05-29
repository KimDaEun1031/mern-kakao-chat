import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";

import { BsXLg, BsArrowClockwise } from "react-icons/bs";

const ChatModalStyle = styled.div`
  position: absolute;
  width: 400px;
  height: 700px;
  background-color: rgba(73, 73, 73, 0.3);

  .chatModalContent {
    width: 300px;
    height: 500px;
    margin: 120px 50px;
    background-color: rgb(245, 245, 245);
    box-shadow: 1px 1px 7px rgba(73, 73, 73, 0.4);

    .chatModalHeader {
      position: relative;
      height: 50px;
      padding: 20px 0 0 5px;

      .modalOffBtn {
        position: absolute;
        top: 5px;
        right: 5px;
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;

        .offIcon {
          font-size: 10px;
          color: rgb(166, 166, 166);
        }
      }

      .title {
        margin: 0;
        padding: 5px 0;
        font-weight: 500;
      }

      .info {
        font-size: 11px;
        font-style: italic;
        color: rgb(191, 0, 0);
      }
    }

    .line {
      width: 100%;
      height: 1px;
      margin: 20px 0;
      background-color: rgba(166, 166, 166, 0.4);
    }

    .refreshBtn {
      position: absolute;
      top: 60px;
      right: 2px;
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;

      .refreshIcon {
        font-size: 22px;
        color: rgb(118, 118, 118);
      }
    }

    .chatModalBody {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        padding-left: 5px;

        .notFriendProfile {
          width: 50px;
          margin: 10px;
          border-radius: 15px;
        }

        .notFriendName {
          padding-left: 10px;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
`;

export default function ChatModal({ email, closeHandler }) {
  const [friendList, setFriendList] = useState([]);
  const [objectIdGroup, setObjectIdGroup] = useState(new Set());

  const getFriendListHandler = async () => {
    try {
      const result = await Axios.get("http://localhost:5000/user/", {
        params: { email: email }
      });

      if (result) {
        setFriendList(result.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkFriendHandler = (id, { target }) => {
    if (target.checked) {
      objectIdGroup.add(id);
      setObjectIdGroup(objectIdGroup);
    } else {
      objectIdGroup.delete(id);
      setObjectIdGroup(objectIdGroup);
    }
  };

  const closeModalHandler = () => {
    closeHandler(false);
  };

  useEffect(() => {
    getFriendListHandler();
  }, []);

  return (
    <ChatModalStyle>
      <div className="chatModalContent">
        <div className="chatModalHeader">
          <button className="modalOffBtn" onClick={closeModalHandler}>
            <BsXLg className="offIcon" />
          </button>
          <p className="title">대화 상태 선택</p>
          <span className="info">체크 후 생성을 클릭하면 대화방이 만들어집니다.</span>
          <button className="refreshBtn">
            <BsArrowClockwise className="refreshIcon"/>
          </button>
        </div>
        <div className="line"></div>
        <ul className="chatModalBody">
          {friendList && friendList.map(item => (
            <li key={item.email}>
              <input type="checkbox" onChange={(event) => checkFriendHandler(item._id, event)} />
              <img src={item.photo} alt="profile" className="notFriendProfile"/>
              <span className="notFriendName">{item.name}</span>
            </li>
          ))}
        </ul>
        <div className="chatModalFooter">
          <button>생성</button>
        </div>
      </div>
    </ChatModalStyle>
  );
}
