import styled from "styled-components";

export const Container = styled.div`
  align-self: center;
  margin-bottom: 3%;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
