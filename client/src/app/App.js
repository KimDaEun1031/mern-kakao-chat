import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Header from "../components/Header/Header";
import ChattingList from "../components/Chat/ChattingList";
import FriendList from "../components/Chat/FriendList";
import Chat from "../components/Chat/Chat";
import NotFound from "../components/NotFound/NotFound";
import SignIn from "../components/Register/SignIn";

const Main = styled.div`
  width: 400px;
  height: 700px;
  margin: 0 auto;
  transform: translateY(30%);
  border: 1px solid rgba(44, 44, 44, 0.2);
  border-radius: 2px;
  box-shadow: 1px 1px 10px rgba(44, 44, 44, 0.2);
`;

function App() {
  const chat = useSelector(state => state.chatReducer);

  return (
    <Main>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/friendlist" element={<FriendList />} />
        <Route path="/chatlist" element={<ChattingList />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Main>
  );
}

export default App;
