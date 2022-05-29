import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
  background-color: white;

  h1 {
    margin: 250px 65px 20px 68px;
    font-size: 50px;
  }

  p {
    margin: 0 140px;

    a {
      text-decoration: none;
      padding: 5px;
      border: 1px solid rgba(44, 44, 44, 0.2);
      border-radius: 50px;

      &:link,
      &:visited,
      &:active {
        color: black;
      }

      &:hover {
        border: 1px solid rgba(44, 44, 44, 0.5);
      }
    }
  }
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <h1>404 Not Found</h1>
      <p>잘못된 경로입니다.
        <Link to="/">돌아가기</Link>
      </p>
    </NotFoundContainer>
  );
}

export default NotFound;
