import React, { useState } from "react";
import { connect, styled, fetch } from "frontity";

const ContactForm = ({ state }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const sendEmail = (e) => {
    e.preventDefault();
    fetch(`${rootUrl}/api/send-email`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formValues,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => setErrorMsg("¡Vaya! Algo salió mal."));
  };

  return (
    <div>
      <h3>Contacta conmigo</h3>
      <Form onSubmit={""}>
        <Label htmlFor="name">Nombre:</Label>
        <Input name="name" type="text" onChange={handleInputChange} required/>
        <Label htmlFor="email">Email:</Label>
        <Input name="email" type="email" onChange={handleInputChange}  required/>
        <Label htmlFor="message">Comentario:</Label>
        <Textarea name="message" maxLength="200" onChange={handleInputChange}  required/>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <SubmitBtn type="submit">Enviar</SubmitBtn>
      </Form>
    </div>
  );
};

export default connect(ContactForm);

const Form = styled.form``;

const Label = styled.label``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const SubmitBtn = styled.button``;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.8;
  font-family: "News Cycle";
`;
