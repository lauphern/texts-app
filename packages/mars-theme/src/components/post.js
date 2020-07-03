import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import { useTransition, animated } from "react-spring";
import List from "./list";
import ContactForm from "./contact-form";

import { styleGuide } from "./styles/style-guide";

// This component is for both posts and pages

const Post = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  //If the current url is "/sobre-mi/", we want to show the ContactForm component
  const currentUrl = state.router.link;

  let [show, setShow] = useState(false);

  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    setShow(true);
    actions.source.fetch("/");
    List.preload();
  }, []);

  useEffect(() => {
    //Cleanup for the color theme: if the user selects the dark color theme,
    //when they visit another route it doesn't matter if they don't switch back to the light color theme before
    //it will be set as the light color theme by default
    return () => actions.theme.toggleColorTheme({ forceLight: true });
  }, [currentUrl]);

  // Load the post, but only if the data is ready.
  return data.isReady
    ? transitions.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedDiv key={key} style={props}>
              <Container>
                {currentUrl !== "/sobre-mi/" && (
                  <ToggleContainer>
                    <ToggleTheme
                      onClick={actions.theme.toggleColorTheme}
                      colorTheme={state.theme.colorTheme}
                    >
                      <CircleToggle colorTheme={state.theme.colorTheme} />
                    </ToggleTheme>
                    <TextToggleTheme>Modo lectura</TextToggleTheme>
                  </ToggleContainer>
                )}
                <div>
                  <Title
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </div>
                <Content>
                  <Html2React html={post.content.rendered} />
                </Content>
              </Container>
              {currentUrl === "/sobre-mi/" && <ContactForm />}
            </AnimatedDiv>
          )
      )
    : null;
};

export default connect(Post);

const AnimatedDiv = styled(animated.div)`
  margin: 5vw 20vw 10vw 18vw;

  @media (max-width: 560px) {
    margin: 5vw 10vw 10vw 8vw;
  }
`;

const Container = styled.div``;

const Title = styled.h2`
  margin: 2.25rem 0 1.5rem 0;
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`
  & p {
    line-height: 2;
    margin-bottom: 1rem;
    font-weight: ${styleGuide.textStyles.copy.fontWeight};
  }

  & > div:nth-of-type(1) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;
    align-items: center;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
  @media (max-width: 700px) {
    & > div {
      display: flex !important;
      flex-direction: column-reverse !important;
    }
  }
`;

// Examples followed, with some changes:
// https://codepen.io/halvves/pen/ExjxaKj
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_switch

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToggleTheme = styled.div(
  (props) => `
  background-color: ${
    props.colorTheme === "light" ? "rgb(100,100,100)" : "white"
  };
  position: relative;
  height: 20px;
  width: 40px;
  border-radius: 12.5px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${
    props.colorTheme === "light"
      ? `4px 4px 4px 0px black inset,
  -4px -4px 4px 0px rgba(100,100,100,0.2) inset;`
      : `4px 4px 4px 0px #d1d9e6 inset,
  -4px -4px 4px 0px #ffffff inset;`
  }
`
);

const CircleToggle = styled.div(
  (props) => `
  background-color: white;
  border-radius: 50%;
  box-shadow: ${
    props.colorTheme === "light"
      ? `0px 3px 8px 1px black,
  0px 5px 5px 0px rgba(255,255,255,0.5) inset`
      : `0px 3px 8px 1px rgba(0,0,0,0.5),
  0px 5px 5px 0px rgba(255,255,255,0.5) inset`
  };
  height: 15px;
  width: 15px;
  position: absolute;
  top: 2.5px;
  transition: left 0.25s;
  left: ${props.colorTheme === "light" ? "2.5px" : "22.5px"}
`
);

const TextToggleTheme = styled.p`
  font-size: 0.8rem;
  font-family: "News Cycle", sans-serif;
  text-align: center;
`;
