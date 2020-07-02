import React from "react";
import { connect, styled, keyframes, css } from "frontity";
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
  return (
    <>
      <article css={articleCSS({ alignSelf, colorTheme: state.theme.colorTheme })}>
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
      </article>
      {!isItLastItem && <Divider colorTheme={state.theme.colorTheme} />}
    </>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const articleCSS = props => css`
  width: 70%;
  overflow: hidden;
  margin: 2rem 0;
  align-self: ${props.alignSelf};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  animation: ${slideUp} 1s ease;

  & > a,
  & > a:visited {
    color: ${styleGuide.colorScheme[props.colorTheme].secondaryText};
    transition: all 0.15s;

    &:hover {
      color: ${styleGuide.colorScheme[props.colorTheme].text};
    }
  }
`;

const Title = styled.h2``;

const Excerpt = styled.div`
  ${"" /* line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8); */}
`;

const Divider = styled.div(
  (props) => `
  height: 1.5px;
  width: 200px;
  margin: 20vh auto;
  background-color: ${styleGuide.colorScheme[props.colorTheme].secondaryText}
`
);
