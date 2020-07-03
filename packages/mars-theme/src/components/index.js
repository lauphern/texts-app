import React, { useState, useEffect, useRef } from "react";
import { Global, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import PasswordProtected from "./password-protected";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import Scrollable from "./scrollbar/scrollable";
import PerspectiveCtr from "./scrollbar/perspective-ctr";
import FixedPos from "./scrollbar/fixed-pos";
import Thumb from "./scrollbar/thumb";
import Track from "./scrollbar/track";
import PageError from "./page-error";
import FontFace from "./styles/font-faces";
import globalStyles from "./styles/global-styles";

import { setHeights, scrollbarInit } from "./scrollbar/script";

import { styleGuide } from "./styles/style-guide";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */

const Theme = ({ state }) => {
  let [forceReRender, setForceReRender] = useState(false);
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  let currentRoute = state.router.link;
  let { doesUserHavePassword } = state.theme;

  const RefToScrollable = useRef(null);
  const RefToFixedPos = useRef(null);
  const RefToPerspectiveCtr = useRef(null);
  const RefToThumb = useRef(null);
  const RefToHeadContainer = useRef(null);
  const RefToHeadBackground = useRef(null);
  const RefToMainComponent = useRef(null);

  useEffect(() => {
    setHeights({
      headContainer: RefToHeadContainer.current,
      headBackground: RefToHeadBackground.current,
      mainContainer: RefToMainComponent.current,
    });
    let isHiddenCurrentRoute = currentRoute === "/hidden/";
    let areAllComponentsMounted =
      !RefToScrollable.current ||
      !RefToFixedPos ||
      !RefToPerspectiveCtr ||
      !RefToThumb;
    if (data.isArchive) {
      if (!isHiddenCurrentRoute && areAllComponentsMounted) {
        setForceReRender(true);
        return;
      }
      if (isHiddenCurrentRoute && doesUserHavePassword) {
        scrollbarInit({
          scrollableComponent: RefToScrollable.current,
          perspectiveCtr: RefToPerspectiveCtr.current,
          thumb: RefToThumb.current,
        });
      } else if (!isHiddenCurrentRoute) {
        scrollbarInit({
          scrollableComponent: RefToScrollable.current,
          perspectiveCtr: RefToPerspectiveCtr.current,
          thumb: RefToThumb.current,
        });
      }
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
      <HeadContainer ref={RefToHeadContainer}>
        <Header />
        <HeadBackground ref={RefToHeadBackground} colorTheme={state.theme.colorTheme} />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main colorTheme={state.theme.colorTheme} ref={RefToMainComponent}>
        <Switch>
          <Loading when={data.isFetching} />
          <PasswordProtected
            when={currentRoute === "/hidden/" && !doesUserHavePassword}
          >
            Enter password
          </PasswordProtected>
          <Scrollable when={data.isArchive} ref={RefToScrollable}>
            <PerspectiveCtr ref={RefToPerspectiveCtr}>
              <Thumb ref={RefToThumb} />
              <Track />
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

const HeadContainer = styled.div`
  ${styleGuide.grid12Col()}
  align-items: end;
  position: sticky;
  top: 0;
  left: 0;
  width: 98vw;
  padding: 0.75rem 2vw 0.75rem 0vw;
  z-index: 2;
`;

const HeadBackground = styled.div(
  (props) => `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  z-index: -1;
  background-color: ${styleGuide.colorScheme[props.colorTheme].background};
  box-shadow: 0px 0px 15px rgba(0,0,0,.2);
`
);

const Main = styled.div(
  (props) => `
  background-color: ${styleGuide.colorScheme[props.colorTheme].background};
  width: 100%;
  // height: calc(100% - 15vh);
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
`
);
