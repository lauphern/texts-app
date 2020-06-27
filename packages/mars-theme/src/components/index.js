import React from "react";
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

import { styleGuide } from "./styles/style-guide";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */

const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  //Get current URL
  const url = state.router.link;

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* We add the globalStyles and fontFaces following the example of the twentytwenty theme */}
      <Global styles={globalStyles} />
      <FontFace />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        <Switch>
          <Loading when={data.isFetching} />
          <List when={data.isArchive} />
          <Post when={data.isPostType} />
          <PageError />
        </Switch>
      </Main>
    </>
  );
};

export default connect(Theme);

const HeadContainer = styled.div`
  ${'' /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */}
  ${'' /* display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem; */}
  ${styleGuide.grid12Col()}
  position: sticky;
  top: 0;
  padding: 0.75rem 0;
  background-color: ${styleGuide.colorScheme.background};
`;

const Main = styled.div`
  ${'' /* display: flex;
  justify-content: center; */}
  ${styleGuide.grid12Col()}
  padding: 0 5vw;
`;
