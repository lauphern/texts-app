import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./mobile-menu/mobile-menu";

import { styleGuide } from "./styles/style-guide";

const Header = ({ state, actions }) => {
  return (
    <>
      <Container>
        <Link link="/">
          <Title>{state.frontity.title}</Title>
          <Description>{state.frontity.description}</Description>
        </Link>
        <MobileMenu />
      </Container>
      <Nav />
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  grid-area: 1 / 1 / 2 / 5;

  @media (max-width: 560px) {
    grid-area: 1 / 1 / 2 / 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 98vw;
    padding: 0rem 5vw 0rem 5vw;
  }
`;

const Title = styled.h1`
  font-style: italic;
  font-weight: 800;
  font-size: 2rem;

  @media (max-width: 560px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.h2`
  font-style: italic;
  font-weight: ${styleGuide.textStyles.copy.fontWeight};
  font-size: 1rem;
  font-family: "Source Sans Pro", sans-serif;
  margin: 0;

  @media (max-width: 560px) {
    font-size: 0.8rem;
  }
`;