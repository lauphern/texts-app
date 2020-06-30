import React, { useEffect, useRef } from "react";
import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import PasswordProtected from "./password-protected";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import FontFace from "./styles/font-faces";
import globalStyles from "./styles/global-styles";

import { scrollbarInit } from "./scrollbar";

import { styleGuide } from "./styles/style-guide";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */

const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  let currentRoute = state.router.link;
  let { doesUserHavePassword } = state.theme;

  const RefToScrollable = useRef(null);
  const RefToFixedPos = useRef(null);
  const RefToPerspectiveCtr = useRef(null);
  const RefToThumb = useRef(null);

  useEffect(() => {
    if (data.isArchive && currentRoute === "/hidden/" && doesUserHavePassword) {
      debugger;
      scrollbarInit({
        scrollableComponent: RefToScrollable.current,
        perspectiveCtr: RefToPerspectiveCtr.current,
        thumb: RefToThumb.current,
      });
    } else if (data.isArchive && currentRoute !== "/hidden/") {
      debugger;
      scrollbarInit({
        scrollableComponent: RefToScrollable.current,
        perspectiveCtr: RefToPerspectiveCtr.current,
        thumb: RefToThumb.current,
      });
    }
  });

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* We add the globalStyles and fontFaces following the example of the twentytwenty theme */}
      <Global styles={globalStyles(state.theme.colorTheme)} />
      <FontFace />

      {/* This element is for the scrollbar functionality */}
      <FixedPos ref={RefToFixedPos}></FixedPos>

      {/* Add the header of the site. */}
      <HeadContainer colorTheme={state.theme.colorTheme}>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main colorTheme={state.theme.colorTheme}>
        <Switch>
          <Loading when={data.isFetching} />
          {/* TODO parece ser que tengo que hacer un handler para passwordProtectedPosts
          https://github.com/frontity/frontity/blob/dev/packages/wp-source/src/libraries/handlers/postType.ts
          */}
          <PasswordProtected when={currentRoute === "/hidden/"}>
            Enter password
          </PasswordProtected>
          <Scrollable
            when={data.isArchive}
            ref={RefToScrollable}
            colorTheme={state.theme.colorTheme}
          >
            <PerspectiveCtr ref={RefToPerspectiveCtr}>
              <Thumb ref={RefToThumb} colorTheme={state.theme.colorTheme} />
              <Track colorTheme={state.theme.colorTheme} />
              <List />
            </PerspectiveCtr>
          </Scrollable>
          <Post when={data.isPostType} />
          <PageError />
        </Switch>
      </Main>
    </>
  );
};

export default connect(Theme);

const HeadContainer = styled.div(
  (props) => `
  ${
    "" /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */
  }
  ${
    "" /* display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem; */
  }
  ${styleGuide.grid12Col()}
  align-items: center;
  position: sticky;
  top: 0;
  padding: 0.75rem 2vw 0.75rem 0;
  background-color: ${styleGuide.colorScheme[props.colorTheme].navBackground};
  height: 15vh;
`
);

const Main = styled.div(
  (props) => `
  ${
    "" /* display: flex;
  justify-content: center; 
  ${styleGuide.grid12Col()}*/
  }
  background-color: ${styleGuide.colorScheme[props.colorTheme].background};
  // overflow-x: hidden;
  // overflow-y: scroll;
  width: 100%;
  height: calc(100% - 15vh);
  position: relative;
  // -webkit-overflow-scrolling: touch;
`
);

const Scrollable = styled.div(
  (props) => `
  ${
    "" /* display: flex;
  justify-content: center; 
  ${styleGuide.grid12Col()}*/
  }
  background-color: ${styleGuide.colorScheme[props.colorTheme].background};
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: relative;
  -webkit-overflow-scrolling: touch;
`
);

const FixedPos = styled.div`
  position: fixed;
  top: 0;
  width: 1px;
  height: 1px;
  z-index: 1;
`;

const PerspectiveCtr = styled.div`
  perspective-origin: top left;
  transform-style: preserve-3d;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
  padding-right: 2vw;
`;

const Thumb = styled.div(
  (props) => `
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${styleGuide.colorScheme[props.colorTheme].accent};
  pointer-events: initial;
  position: absolute;
  transform-origin: top left;
  top: 0;
  left: 0;
  cursor: pointer;

  &:hover:before {
    transform: scale(1.2);
  }

  &:before{
    content: "";
    background-color: ${styleGuide.colorScheme[props.colorTheme].accent};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    transition: all 0.15s;
  }
`
);

const Track = styled.div(
  (props) => `
  background-color: ${styleGuide.colorScheme[props.colorTheme].accent};
  position: absolute;
  top: 0;
  left: 0;
  width: 1.5px;
  height: calc(100% - 10px);
  margin: 5px 0 0 4.25px;
`
);
