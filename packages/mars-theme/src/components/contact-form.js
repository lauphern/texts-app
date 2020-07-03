import React, { useState } from "react";
import { connect, styled, fetch } from "frontity";

const ContactForm = ({ state }) => {
  const rootUrl = state.frontity.url;

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleInputChange = (e) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const sendEmail = (e) => {
    e.preventDefault();
    fetch(`${rootUrl}/api/send-email`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSuccessMsg(data.message);
        else setErrorMsg("¡Vaya! Algo salió mal.");
      })
      .catch((err) => {setErrorMsg("¡Vaya! Algo salió mal.")});
  };

  return (
    <Container>
      <h3>Contacta conmigo</h3>
      <Form onSubmit={sendEmail}>
        <Label htmlFor="name">Nombre <span>(Requerido)</span>:</Label>
        <Input name="name" type="text" onChange={handleInputChange} required />
        <Label htmlFor="email">Email <span>(Requerido)</span>:</Label>
        <Input
          name="email"
          type="email"
          onChange={handleInputChange}
          required
        />
        <Label htmlFor="message">Comentario <span>(Requerido)</span>:</Label>
        <Textarea
          name="message"
          maxLength="200"
          onChange={handleInputChange}
          required
        />
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
        <SubmitBtn type="submit">Enviar</SubmitBtn>
      </Form>
    </Container>
  );
};

export default connect(ContactForm);

const Container = styled.div`
  margin-top: 2.5rem;
`;

const Form = styled.form`
  font-family: "Source Sans Pro", sans-serif;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 1.25rem;
   
  & span {
    font-size: 0.7em;
  }
`;

const Input = styled.input``;

const Textarea = styled.textarea``;

const SubmitBtn = styled.button`
  align-self: baseline;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.8;
  font-family: "News Cycle";
`;

const SuccessMsg = styled.p`
  font-size: 0.8;
  font-family: "News Cycle";
`;
