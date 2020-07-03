import React from "react";
import { styled, connect } from "frontity";
import Link from "../link";

import { styleGuide } from "../styles/style-guide";

const MenuModal = ({ state }) => {
  const { menu } = state.theme;
  const isThereLinks = menu != null && menu.length > 0;

  return (
    <>
      <MenuOverlay colorTheme={state.theme.colorTheme}/>
      <MenuContent>
        {isThereLinks &&
          menu.map(([name, link]) => (
            <MenuLink
              key={name}
              link={link}
              aria-current={state.router.link === link ? "page" : undefined}
            >
              {name}
            </MenuLink>
          ))}
      </MenuContent>
    </>
  );
};

const MenuOverlay = styled.div(props => `
  background-color: ${styleGuide.colorScheme[props.colorTheme].background};
  width: 100vw;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
`);

const MenuContent = styled.nav`
  z-index: 5;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuLink = styled(Link)`
  width: 100%;
  display: inline-block;
  outline: 0;
  font-size: 2.5rem;
  text-align: center;
  padding: 1.2rem 0;
`;

export default connect(MenuModal);
