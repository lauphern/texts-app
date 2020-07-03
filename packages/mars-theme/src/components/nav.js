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
        <NavItem key={name} colorTheme={state.theme.colorTheme}>
          {/* If link url is the current page, add `aria-current` for a11y */}
          <Link link={link} aria-current={isCurrentPage ? "page" : undefined}>
            {name}
          </Link>
        </NavItem>
      );
    })}
  </NavContainer>
);

export default connect(Nav);

const NavContainer = styled.nav`
  grid-area: 1 / 5 / 2 / 13;
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-height: 20vh;
  margin: 0;
  overflow-x: auto;

  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const NavItem = styled.div(props => `
  margin-left: 2vw;

  &:first-of-type {
    margin: 0;
  }


  & > a {
    display: inline-block;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid transparent;

    &[aria-current="page"] {
      border-bottom-color: ${styleGuide.colorScheme[props.colorTheme].text};
    }
  }
`);