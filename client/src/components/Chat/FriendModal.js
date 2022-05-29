import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";

import { BsXLg, BsArrowClockwise } from "react-icons/bs";

const FriendModalStyle = styled.div`
  position: absolute;
  width: 400px;
  height: 700px;
  background-color: rgba(73, 73, 73, 0.3);

  .friendModalContent {
    width: 300px;
    height: 500px;
    margin: 120px 50px;
    background-color: rgb(245, 245, 245);
    box-shadow: 1px 1px 7px rgba(73, 73, 73, 0.4);

    .friendModalHeader {
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

    .friendModalBody {
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

export default function FriendModal({ email, closeHandler }) {
  const [notFriendList, setNotFriendList] = useState([]);
  const [objectId, setObjectId] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const getNotFriendListHandler = async () => {
    try {
      const result = await Axios.get("http://localhost:5000/user/notfriend", {
        params: { email: email }
      });

      if (result) {
        setNotFriendList(result.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkFriendHandler = (id) => {
    setIsCheck(true);
    setObjectId(id);
  };

  const addFriendHandler = async (id) => {
    try {
      const result = await Axios.post("http://localhost:5000/user/addfriend", {
        id: id,
        email: email,
      });

      if (result) {
        getNotFriendListHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModalHandler = () => {
    closeHandler(false);
  };

  useEffect(() => {
    getNotFriendListHandler();
  }, []);

  useEffect(() => {
    if (isCheck) {
      addFriendHandler(objectId);
    }
  }, [isCheck]);

  return (
    <FriendModalStyle>
      <div className="friendModalContent">
        <div className="friendModalHeader">
          <button className="modalOffBtn" onClick={closeModalHandler}>
            <BsXLg className="offIcon" />
          </button>
          <p className="title">등록되지 않은 친구</p>
          <span className="info">체크 시 친구가 추가됩니다.</span>
          <button className="refreshBtn">
            <BsArrowClockwise className="refreshIcon"/>
          </button>
        </div>
        <div className="line"></div>
        <ul className="friendModalBody">
          {notFriendList && notFriendList.map(item => (
            <li key={item.email}>
              <input type="checkbox" value={isCheck} onChange={() => checkFriendHandler(item._id)} />
              <img src={item.photo} alt="profile" className="notFriendProfile"/>
              <span className="notFriendName">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </FriendModalStyle>
  );
}
