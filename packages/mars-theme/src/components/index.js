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

import { styleGuide } from "./styles/styleGuide";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */

// let dynamicStyle = (props) => css`background-color: ${props.backgroundColor}`;

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

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* We add the font-faces following the example of the twentytwenty theme */}
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

const globalStyles = css`
  body {
    margin: 0;
    font-family: "Playfair Display", serif;
    ${"" /* color: ${(props) => props.textColor} */}
    color: ${styleGuide.colorScheme.text};
  }
  a,
  a:visited {
    ${"" /* color: ${(props) => props.textColor}; */}
    text-decoration: none;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${
    "" /* Docs source to use props here: https://emotion.sh/docs/@emotion/styled */
  }
  background-color: ${(props) => props.backgroundColor};
  ${"" /* ${dynamicStyle}; */}
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
`;
