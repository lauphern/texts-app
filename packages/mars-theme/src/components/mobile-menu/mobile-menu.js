import React from "react";
import { styled, connect, Global } from "frontity";
import { CloseIcon, HamburgerIcon } from "./mobile-menu-icon";
import MenuModal from "./mobile-menu-modal";

import { styleGuide } from "../styles/style-guide";

function MobileMenu({ state, actions }) {
  const { isMobileMenuOpen } = state.theme;
  return (
    <>
      <MenuToggle onClick={actions.theme.toggleMobileMenu} colorTheme={state.theme.colorTheme}>
        {isMobileMenuOpen ? (
          <>
            {/* Add some style to the body when menu is open,
            to prevent body scroll */}
            <Global styles={{ body: { overflowY: "hidden" } }} />
            <CloseIcon size="20px" />
          </>
        ) : (
          <HamburgerIcon size="24px" />
        )}
      </MenuToggle>
      {/* If the menu is open, render the menu modal */}
      {isMobileMenuOpen && <MenuModal />}
    </>
  );
}

const MenuToggle = styled.button(
  (props) => `
  position: absolute;
  right: 24px;
  top: 24px;
  background: transparent;
  border: 0;
  color: ${styleGuide.colorScheme[props.colorTheme].text};
  z-index: 6;
  height: 40px;
  width: 40px;
  display: none;
  box-shadow: none;
  padding: 0;
  margin: 0;

  &:focus {
    outline: none;
  }

  @media (max-width: 560px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    right: 0;
    top: 0;
  }
`
);

export default connect(MobileMenu);
