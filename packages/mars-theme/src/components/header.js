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
        </StyledLink>
        <MobileMenu />
      </Container>
      <Nav />
      <div>
        <ToggleTheme
          onClick={actions.theme.toggleColorTheme}
          colorTheme={state.theme.colorTheme}
        >
          <CircleToggle colorTheme={state.theme.colorTheme} />
        </ToggleTheme>
        <TextToggleTheme>Change color mode</TextToggleTheme>
      </div>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  margin-left: 5vw;
  grid-area: 1 / 1 / 2 / 5;
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
  font-weight: 500;
  font-size: 1.25rem;
  ${"" /* margin: 0;
  margin-bottom: 16px; */}
`;

const StyledLink = styled(Link)`
  ${"" /* text-decoration: none; */}
`;

// Examples followed, with some changes:
// https://codepen.io/halvves/pen/ExjxaKj
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_switch
const ToggleTheme = styled.div(
  (props) => `
  background-color: ${props.colorTheme === "light" ? styleGuide.colorScheme["dark"].background : "white"};
  position: relative;
  height: 30px;
  width: 60px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow:
    -8px -4px 8px 0px #ffffff,
    8px 4px 12px 0px #d1d9e6,
    4px 4px 4px 0px #d1d9e6 inset,
    -4px -4px 4px 0px #ffffff inset;
`
);

const CircleToggle = styled.div(
  (props) => `
  background-color: white;
  border-radius: 50%;
  box-shadow:
    -8px -4px 8px 0px #ffffff,
    8px 4px 12px 0px #d1d9e6;
  height: 30px;
  width: 30px;
  position: absolute;
  top: 0;
  transition: left 0.15s;
  left: ${props.colorTheme === "light" ? "0" : "30px"}
`
);

const TextToggleTheme = styled.strong`
  font-size: 0.8rem;
  font-family: "News Cycle", sans-serif;
`;
