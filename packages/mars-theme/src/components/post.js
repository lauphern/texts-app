import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import { useTransition, animated } from "react-spring";
import List from "./list";
import ContactForm from "./contact-form";

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

  // Load the post, but only if the data is ready.
  return data.isReady
    ? transitions.map(
        ({ item, key, props }) =>
          item && (
            <AnimatedDiv key={key} style={props}>
              <Container>
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
`;

const Container = styled.div``;

const Title = styled.h2``;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
const Content = styled.div`

  & p {
    line-height: 2;
    margin-bottom: 1rem;
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
`;
