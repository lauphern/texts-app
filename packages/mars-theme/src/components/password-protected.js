import React, { useState } from "react";
import { connect, styled, fetch } from "frontity";

import { styleGuide } from "./styles/style-guide";

const PasswordProtected = ({ state, actions }) => {
  const rootUrl = state.frontity.url;

  let [inputVal, setInputVal] = useState("");
  let [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = () => {
    if (inputVal == "") setErrorMsg("Tienes que introducir una contraseña");
    else {
      // Using a Vercel serverless function
      fetch(`${rootUrl}/api/compare-passwords?pw=${inputVal}`, {
        mode: "cors",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.doPasswordsMatch)
            setErrorMsg(
              "La contraseña no es correcta. Para adquirir la contraseña, debes contactar con la autora a través del formulario de contacto."
            );
          else if (data.doPasswordsMatch) {
            actions.theme.savePassword(inputVal);
          }
        })
        .catch((err) => {
          setErrorMsg("¡Algo salió mal!");
        });
    }
  };

  return (
    <Modal colorTheme={state.theme.colorTheme}>
      <Dialog colorTheme={state.theme.colorTheme}>
        <p>Introduzca la contraseña:</p>
        <Input
          type="password"
          value={inputVal}
          onChange={(e) => setInputVal(e.currentTarget.value)}
        />
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <Btn onClick={handleSubmit}>Enviar</Btn>
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
  right: 0;
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
