import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import Axios from "axios";

import SideMenu from "./SideMenu";
import FriendModal from "./FriendModal";

import { BsPersonPlus } from "react-icons/bs";

const FriendListContainer = styled.div`
  display: flex;

  .friendListHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0 8px 15px;

    .friend {
      font-size: 20px;
      font-weight: bold;
    }

    .addFriendBtn {
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;

      .addFriendIcon {
        padding-top: 5px;
        font-size: 24px;
      }
    }
  }

  .myInfo, .friendInfo {
    display: flex;
    align-items: center;
    width: 320px;
    padding: 10px 15px;
    border: none;
    outline: none;
    background-color: transparent;

    &:hover {
      background-color: rgba(220, 220, 220, 0.3);
    }
  }

  .userProfile {
    width: 50px;
    border-radius: 17px;
  }

  .userName {
    padding-left: 15px;
    font-size: 14px;
    font-weight: 500;
  }

  .friendLen {
    margin: 0 0 5px 16px;
    font-size: 12px;
    color: rgb(179, 179, 179);
  }

  .friendProfile {
    width: 40px;
    border-radius: 15px;
  }

  .friendName {
    padding-left: 15px;
    font-size: 14px;
    font-weight: 500;
  }

  .line {
    width: 290px;
    height: 1px;
    margin: 8px 0 8px 15px;
    background-color: rgba(220, 220, 220, 0.6);
  }
`;

function FriendList() {
  const { state } = useLocation();
  const [myInfo, setMyInfo] = useState(null);
  const [myFriendList, setMyFriendList] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getMyInfo = async () => {
    try {
      const result = await Axios.get("http://localhost:5000/user/", {
        params: { email: email }
      });

      if (result) {
        setMyFriendList(result.data.users);
        setMyInfo(result.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  const { email } = state.result;

  const addFriendModalOpenHandler = () => {
    setIsOpenModal(true);
  };

  const addFriendModalCloseHandler = (result) => {
    setIsOpenModal(result);
    getMyInfo();
  };


  return (
    <FriendListContainer>
      <SideMenu result={state.result} />
      <div>
        <div className="friendListHeader">
          <span className="friend">친구</span>
          <button className="addFriendBtn" onClick={addFriendModalOpenHandler}>
            <BsPersonPlus className="addFriendIcon"/>
          </button>
        </div>
        {myInfo &&
          <button className="myInfo">
            <img src={myInfo.photo} alt="profile" className="userProfile"/>
            <span className="userName">{myInfo.name}</span>
          </button>
        }
        <div className="line"></div>
        {myFriendList && <p className="friendLen">친구 {myFriendList.length}</p>}
        {myFriendList && myFriendList.map(item => (
          <button className="friendInfo" key={item._id}>
            <img src={item.photo} alt="profile" className="friendProfile"/>
            <span className="friendName">{item.name}</span>
          </button>
        ))}
      </div>
      {isOpenModal && <FriendModal email={email} closeHandler={addFriendModalCloseHandler} />}
    </FriendListContainer>
  );
}

export default FriendList;
