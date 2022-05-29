import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { FiSearch, FiMessageSquare, FiUsers } from "react-icons/fi";
import { BiX } from "react-icons/bi";

import Input from "../shared/Input";
import Button from "../shared/Button";

import { showList, toggleExitBtn } from "../../features/chat/actions";

const HeaderStyle = styled.div`
  background-color: white;
  text-align: center;
  border-bottom: 5px solid rgba(44, 44, 44, 0.2);

  .search-group {
    margin: 10px;
    display: flex;

    input {
      width: 85%;
      padding: 13px;
      border: 1px solid rgba(44, 44, 44, 0.2);
      border-radius: 50px;
      font-size: 18px;
    }

    button {
      margin-bottom: 3px;

      .search-icon, .exit-icon {
        font-size: 24px;
        color: rgba(44, 44, 44, 0.8);
      }
    }
  }

  .list-group {
    display: flex;
    justify-content: space-around;

    a {
      text-decoration: none;
      width: 240px;
      margin-bottom: 1px;
      padding: 5px;
      background-color: rgba(248, 249, 249, 0.9);
      border: 1px solid white;
      border-style: none solid;

      &:first-child {
        ${({changeColor}) => {
          return changeColor === "friendlist" ? `background-color: rgba(240, 240, 240, 0.9);` : `background-color: rgba(248, 249, 249, 0.9);`
        }};
      }

      &:last-child {
        ${({changeColor}) => {
          return changeColor === "chatlist" ? `background-color: rgba(240, 240, 240, 0.9);` : `background-color: rgba(248, 249, 249, 0.9);`
        }};
      }

      &:link,
      &:visited,
      &:active {
        color: black;
      }
    }
  }
`;

function Header() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const toggle = useSelector(state => state.toggleReducer);
  const currentLocation = location.pathname.slice(1, location.pathname.length);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(showList(search));
  };

  const showListHandler = () => {
    toggle.searchExit ? dispatch(showList(null)) : dispatch(showList(search));
  };

  const changeSearchKeywordHandler = (event) => {
    setSearch(event.target.value);
  };

  const focusInputHandler = () => {
    dispatch(toggleExitBtn());
  };

  const searchExitHandler = () => {
    setSearch('');
    dispatch(showList(null));
    dispatch(toggleExitBtn());
  };

  return (
    <HeaderStyle changeColor={currentLocation}>
      <form
        className="search-group"
        onSubmit={submitHandler}
      >
        <Input
          type="text"
          placeholder="통합검색"
          value={search}
          onChange={changeSearchKeywordHandler}
          onClick={() => {toggle.searchExit && focusInputHandler()}}
        />
        <Button
          type="button"
          onClick={() => {!toggle.searchExit && searchExitHandler()}}
        >
          <BiX className="exit-icon"/>
        </Button>
        <Button type="submit">
          <FiSearch className="search-icon"/>
        </Button>
      </form>
      <div className="list-group">
        <Link
          to='/friendlist'
          onClick={() => {showListHandler()}}
        >
          <span>
            <FiUsers />
          </span>
          <br/>
          <span>Friends</span>
        </Link>
        <Link
          to='/chatlist'
          onClick={() => {showListHandler()}}
        >
          <span>
            <FiMessageSquare />
          </span>
          <br/>
          <span>Chat</span>
        </Link>
      </div>
    </HeaderStyle>
  );
}

export default Header;
