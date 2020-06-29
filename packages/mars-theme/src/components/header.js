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
        <StyledLink link="/">
          <Title>{state.frontity.title}</Title>
          <Description>{state.frontity.description}</Description>
        </StyledLink>
        <MobileMenu />
      </Container>
      <Nav />
      <ToggleContainer>
        <ToggleTheme
          onClick={actions.theme.toggleColorTheme}
          colorTheme={state.theme.colorTheme}
        >
          <CircleToggle colorTheme={state.theme.colorTheme} />
        </ToggleTheme>
        <TextToggleTheme>Modo lectura</TextToggleTheme>
      </ToggleContainer>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  margin-left: 2vw;
  grid-area: 1 / 1 / 3 / 5;
  ${"" /* width: 848px;
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
  font-weight: 800;
  font-size: 2.5rem;
  ${"" /* margin: 0;
  margin-bottom: 16px; */}
`;

const Description = styled.h2`
  font-style: italic;
  font-weight: 400;
  font-size: 1.2rem;
  ${"" /* margin: 0;
  margin-bottom: 16px; */}
`;

const StyledLink = styled(Link)`
  ${"" /* text-decoration: none; */}
`;

// Examples followed, with some changes:
// https://codepen.io/halvves/pen/ExjxaKj
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_switch

const ToggleContainer = styled.div`
  grid-area: 2 / 11 / 3 / 13;
  justify-self: end;
  padding-right: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToggleTheme = styled.div(
  (props) => `
  background-color: ${
    props.colorTheme === "light" ? "rgb(100,100,100)" : "white"
  };
  position: relative;
  height: 20px;
  width: 40px;
  border-radius: 12.5px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${
    props.colorTheme === "light"
      ? `4px 4px 4px 0px black inset,
  -4px -4px 4px 0px rgba(100,100,100,0.2) inset;`
      : `4px 4px 4px 0px #d1d9e6 inset,
  -4px -4px 4px 0px #ffffff inset;`
  }
`
);

const CircleToggle = styled.div(
  (props) => `
  background-color: white;
  border-radius: 50%;
  box-shadow: ${
    props.colorTheme === "light"
      ? `0px 3px 8px 1px black,
  0px 5px 5px 0px rgba(255,255,255,0.5) inset`
      : `0px 3px 8px 1px rgba(0,0,0,0.5),
  0px 5px 5px 0px rgba(255,255,255,0.5) inset`
  };
  height: 15px;
  width: 15px;
  position: absolute;
  top: 2.5px;
  transition: left 0.25s;
  left: ${props.colorTheme === "light" ? "2.5px" : "22.5px"}
`
);

const TextToggleTheme = styled.strong`
  font-size: 0.8rem;
  font-family: "News Cycle", sans-serif;
  text-align: center;
`;
