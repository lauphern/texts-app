import React, { useState } from "react";
import { connect, styled, keyframes, css } from "frontity";
import { useSpring, animated, config } from "react-spring";
import VisibilitySensor from "react-visibility-sensor";
import Link from "../link";

import { styleGuide } from "../styles/style-guide";

/**
 * Item Component
 *
 * It renders the preview of a blog post. Each blog post contains
 * - Title: clickable title of the post
 * - Author: name of author and published date
 */
const Item = ({ state, item, alignSelf, isItLastItem }) => {
  let [show, setShow] = useState(false);

  const fadeIn = useSpring({
    config: config.slow,
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(80px)",
  });

  const onChange = (isVisible) => {
    isVisible && setShow(isVisible);
  };

  return (
    <>
      <VisibilitySensor onChange={onChange}>
        <Article
          alignself={alignSelf}
          style={fadeIn}
        >
          <Link link={item.link}>
            <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
          </Link>
          <Link link={item.link}>
            {/* If the post has an excerpt (short summary text), we render it */}
            {item.excerpt && (
              <Excerpt
                dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
              />
            )}
          </Link>
          <StyledLink link={item.link}>Continuar leyendo...</StyledLink>
        </Article>
      </VisibilitySensor>
      {!isItLastItem && <Divider />}
    </>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);

const Article = styled(animated.article)(
  (props) => `
  width: 70%;
  overflow: hidden;
  margin: 2rem 0;
  align-self: ${props.alignself};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  & > a,
  & > a:visited {
    color: ${styleGuide.colorScheme.light.secondaryText};
    transition: all 0.15s;

    &:hover {
      color: ${styleGuide.colorScheme.light.text};
    }
  }

  @media (max-width: 900px) {
    align-self: start;
    width: 90%;

    &:nth-of-type(1) {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  }
`
);

const Title = styled.h2`
    @media (max-width: 560px) {
      font-size: 1.5rem;
      margin: 0.75rem 0;
    }
`;

const Excerpt = styled.div`
  font-weight: ${styleGuide.textStyles.copy.fontWeight};

  @media (max-width: 560px) {
    color: ${styleGuide.colorScheme.light.text};
    font-size: 12px;
  }
`;

const StyledLink = styled(Link)`
  color: ${styleGuide.colorScheme.light.text} !important;
  font-style: italic;
  font-family: "Source Sans Pro", sans-serif;
  margin-top: 2rem;

  @media (max-width: 560px) {
    margin-top: 0.75rem;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 50vw;
  margin: 20vh auto;
  background-color: ${styleGuide.colorScheme.light.secondaryText};

  @media (max-width: 900px) {
    margin: 5vh 0;
    width: 50%;
  }
`;
