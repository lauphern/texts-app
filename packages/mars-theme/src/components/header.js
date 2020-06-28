import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./mobile-menu/mobile-menu";

const Header = ({ state, actions }) => {
  return (
    <>
      <Container>
        <StyledLink link="/">
          <Title>{state.frontity.title}</Title>
        </StyledLink>
        <MobileMenu />
      </Container>
      <Nav />
      <BtnTheme onClick={actions.theme.toggleColorTheme}>Dark mode</BtnTheme>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  margin-left: 5vw;
  grid-area: 1 / 1 / 2 / 5;
  ${'' /* width: 848px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around; */}
`;

const Title = styled.h1`
  font-style: italic;
  font-weight: 500;
  font-size: 1.25rem;
  ${'' /* margin: 0;
  margin-bottom: 16px; */}
`;

const StyledLink = styled(Link)`
  ${'' /* text-decoration: none; */}
`;

const BtnTheme = styled.button``;