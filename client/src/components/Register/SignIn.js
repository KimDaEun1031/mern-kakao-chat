import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";

import { RiKakaoTalkFill } from "react-icons/ri";

const SignInContainer = styled.div`
  height: 100%;
  text-align: center;
  border-radius: 2px;
  background-color: rgb(254, 240, 27);

  .kakaoLogo {
    transform: translateY(200px);
    .kakaoIcon {
      font-size: 100px;
      color: rgb(58, 29, 29);
    }
  }
`;

const SignInForm = styled.div`
  transform: translateY(230px);

  input {
    width: 250px;
    height: 35px;
    border: none;
    border: 1px solid rgb(213, 200, 0);
    outline: none;
  }

  .email {
    border-bottom: none;
  }

  .password {
    border-top: 1px solid rgba(157, 157, 157, 0.8);
  }

  .signInBtn {
    width: 255px;
    height: 40px;
    margin: 5px 0;
    border: none;
    border: 1px solid rgb(213, 200, 0);
    border-radius: 3px;
    outline: none;
    color: rgb(180, 180, 180);
    background-color: rgb(245, 245, 245);
  }

  .enable {
    color: rgb(230, 230, 230);
    background-color: rgba(58, 29, 29, 0.9);
  }
`;

export default function SignIn() {
  const navigate = useNavigate();
  const [signInInfo, setSinginInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = signInInfo;

  const inputHandler = (event) => {
    const { name, value } = event.target;

    setSinginInfo({
      ...signInInfo,
      [name]: value,
    });
  };

  const submitHandler = async () => {
    try {
      const result = await Axios.post("http://localhost:5000/user/register", { user: signInInfo });
      console.log(result.data.user);
      if (result) {
        navigate("/friendlist", {
          state: { result: result.data.user }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <SignInContainer>
      <div className="kakaoLogo">
        <RiKakaoTalkFill className="kakaoIcon"/>
      </div>
      <SignInForm>
          <div className="emailInput">
            <input
              type="email"
              name="email"
              className="email"
              value={email}
              onChange={inputHandler}
            />
          </div>
          <div className="passwordInput">
            <input
              type="password"
              name="password"
              className="password"
              value={password}
              onChange={inputHandler}
            />
          </div>
          <button
            type="submit"
            className="signInBtn"
            onClick={() => {submitHandler()}}
          >
            로그인
          </button>
      </SignInForm>
    </SignInContainer>
  );
}
