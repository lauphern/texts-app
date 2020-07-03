import React from "react";
import { styled, connect } from "frontity";

const description404 = (
  <>
    Esa página no existe{" "}
    <span role="img" aria-label="confused face">
      😕
    </span>
  </>
);

const description = (
  <>
    Parece que ha habido un error. Si continúa, prueba refrescando la página o utiliza mi formulario de contacto.
  </>
);

// The 404 page component
const Page404 = ({ state }) => {
  const data = state.source.get(state.router.link);

  const title = "Vaya! Algo salió mal";
  const title404 = "Ups! 404";

  return (
    <Container>
      <Title>{data.is404 ? title404 : title}</Title>
      <Description>{data.is404 ? description404 : description}</Description>
    </Container>
  );
};

export default connect(Page404);

const Container = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
`;

const Description = styled.div`
  font-family: "Source Sans Pro"
`;
