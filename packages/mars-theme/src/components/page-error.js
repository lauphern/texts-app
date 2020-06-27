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
  ${'' /* width: 800px;
  margin: 0;
  padding: 24px;
  text-align: center; */}
`;

const Title = styled.h1`
  ${'' /* margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: rgba(12, 17, 43);
  font-size: 4em; */}
`;

const Description = styled.div`
  ${'' /* line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
  margin: 24px 0; */}
`;
