import styled from "styled-components";

export default styled.li`
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