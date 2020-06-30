import React, { useState } from "react";
import { connect, styled } from "frontity";

import { styleGuide } from "./styles/style-guide";

const PasswordProtected = ({ state, actions }) => {
  let [inputVal, setInputVal] = useState("");
  let [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleSubmit = () => {
    if (inputVal == "") setShowErrorMsg(true);
    else actions.theme.savePassword(inputVal);
  };

  return (
    <Modal colorTheme={state.theme.colorTheme}>
      <Dialog colorTheme={state.theme.colorTheme}>
        <p>Enter password:</p>
        <Input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.currentTarget.value)}
        />
        {showErrorMsg && <ErrorMsg>The input field cannot be empty</ErrorMsg>}
        <Btn onClick={handleSubmit}>Send</Btn>
      </Dialog>
    </Modal>
  );
};

export default connect(PasswordProtected);

const Modal = styled.div(
  (props) => `
  background-color: ${styleGuide.colorScheme[props.colorTheme].background};
  height: 85vh;
  width: 100vw;
  position: fixed;
  top: 15vh;
  left: 0;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-columns: 1fr 2fr 1fr;
`
);

const Dialog = styled.div(
  (props) => `
  background-color: ${styleGuide.colorScheme[props.colorTheme].background};
  border-radius: 3px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, .2);
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
);

const Input = styled.input``;

const Btn = styled.button``;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.8;
  font-family: "News Cycle";
`;
