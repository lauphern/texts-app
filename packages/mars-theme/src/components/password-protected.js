import React, { useState, useEffect } from "react";
import { connect, styled, fetch } from "frontity";
import { useTransition, animated } from "react-spring";

import { styleGuide } from "./styles/style-guide";

const PasswordProtected = ({ state, actions }) => {
  const rootUrl = state.frontity.url;

  let [inputVal, setInputVal] = useState("");
  let [errorMsg, setErrorMsg] = useState("");
  let [show, setShow] = useState(false);

  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

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
              "La contraseña no es correcta."
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

  useEffect(() => setShow(true), []);

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <Modal key={key} style={props}>
          <Dialog>
            <Disclaimer>En esta zona, la autora publicará sus textos más personales y los que todavía están en desarrollo. Necesitas una contraseña para acceder a este contenido. Para adquirirla, debes contactar con la autora a través del formulario de contacto.</Disclaimer>
            <Label colorTheme={state.theme.colorTheme} >Introduzca la contraseña:</Label>
            <Input
              type="password"
              value={inputVal}
              placeholder="contraseña"
              onChange={(e) => setInputVal(e.currentTarget.value)}
            />
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
            <Btn onClick={handleSubmit}>Enviar</Btn>
          </Dialog>
        </Modal>
      )
  );
};

export default connect(PasswordProtected);

const Modal = styled(animated.div)`
  background-color: ${styleGuide.colorScheme.light.background};
  height: 100%;
  width: 100vw;
  position: relative;
  left: 0;
  right: 0;
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  grid-template-columns: 1fr 2fr 1fr;
`;

const Dialog = styled.div`
  background-color: ${styleGuide.colorScheme.light.background};
  border-radius: 3px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, .2);
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
  margin-left: -2vw;

  & * {
    margin-top: 1rem;
  }

  & > *:nth-child(1) {
    margin-top: 0;
  }

  @media (max-width: 560px) {
    padding: 0.75rem;
    width: 90vw;
  }
`;

const Disclaimer = styled.p`
  font-weight: ${styleGuide.textStyles.copy.fontWeight};

  @media (max-width: 560px) {
    text-align: center;
  }
`;

const Label = styled.label`
  font-family: "Source Sans Pro", sans-serif;
  margin-top: 2rem;
`;

const Input = styled.input`
  text-align: center;
`;

const Btn = styled.button``;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.8;
  font-family: "News Cycle";
`;
