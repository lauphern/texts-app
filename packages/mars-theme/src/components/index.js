import React, { useEffect, useRef } from "react";
import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
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

  const RefToMain = useRef(null);
  const RefToFixedPos = useRef(null);
  const RefToPerspectiveCtr = useRef(null);
  const RefToThumb = useRef(null)

  useEffect(() => {
    if(data.isArchive) scrollbarInit({
      scrollableComponent: RefToMain.current,
      colorTheme: state.theme.colorTheme,
      fixedPos: RefToFixedPos.current,
      perspectiveCtr: RefToPerspectiveCtr.current,
      thumb: RefToThumb.current
    });
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
      <div ref={RefToFixedPos}></div>

      {/* Add the header of the site. */}
      <HeadContainer colorTheme={state.theme.colorTheme}>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main ref={RefToMain} colorTheme={state.theme.colorTheme}>
        <Switch>
          <Loading when={data.isFetching} />
          <PerspectiveCtr when={data.isArchive} ref={RefToPerspectiveCtr}>
            <div ref={RefToThumb}></div>
            <List />
          </PerspectiveCtr>
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
  padding: 0.75rem 0;
  background-color: ${styleGuide.colorScheme[props.colorTheme].navBackground};
  height: 20vh;
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
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: calc(100% - 20vh);
  position: relative;
  -webkit-overflow-scrolling: touch;
`
);

const PerspectiveCtr = styled.div``;
