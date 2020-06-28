import React from "react";
import { connect, styled } from "frontity";
import Link from "./link";

import { styleGuide } from "./styles/style-guide";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = ({ state }) => (
  <NavContainer>
    {state.theme.menu.map(([name, link]) => {
      // Check if the link matched the current page url
      const isCurrentPage = state.router.link === link;
      return (
        <NavItem key={name}>
          {/* If link url is the current page, add `aria-current` for a11y */}
          <Link link={link} aria-current={isCurrentPage ? "page" : undefined}>
            {name}
          </Link>
        </NavItem>
      );
    })}
    <Underline colorTheme={state.theme.colorTheme} />
  </NavContainer>
);

export default connect(Nav);

const NavContainer = styled.nav`
  grid-area: 1 / 5 / 2 / 13;
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${"" /* width: 80vw; */}
  max-height: 20vh;
  padding-right: 2vw;
  margin: 0;
  overflow-x: auto;
  ${"" /* position: relative; */}

  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const NavItem = styled.div`
  margin-left: 2vw;

  &:first-of-type {
    margin: 0;
  }
  ${"" /* padding: 0;
  margin: 0 16px;
  color: #fff;
  font-size: 0.9em;
  box-sizing: border-box; 
  flex-shrink: 0;*/}

  & > a {
    display: inline-block;
    ${"" /* line-height: 2em;
    border-bottom: 2px solid;
    border-bottom-color: transparent; */}
    /* Use for semantic approach to style the current link */
    &[aria-current="page"] {
      ${"" /* border-bottom-color: #fff; */}
    }
  }

  &:first-of-type {
    ${"" /* margin-left: 0; */}
  }

  &:last-of-type {
    ${"" /* margin-right: 0; */}

    &:after {
      ${"" /* content: "";
      display: inline-block;
      width: 24px; */}
    }
  }
`;

const Underline = styled.div(props => `
  background-color: ${styleGuide.colorScheme[props.colorTheme].accent};
  height: 3px;
  width: 66.7%;
  position: absolute;
  right: 0;
  bottom: 0;
`);
