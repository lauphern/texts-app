import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";

import { styleGuide } from "../styles/style-guide";

/**
 * Item Component
 *
 * It renders the preview of a blog post. Each blog post contains
 * - Title: clickable title of the post
 * - Author: name of author and published date
 */
const Item = ({ state, item, alignSelf }) => {
  return (
    <Article alignSelf={alignSelf}>
      <Link link={item.link}>
        <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
      
      {/* If the post has an excerpt (short summary text), we render it */}
      {item.excerpt && (
        <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
      )}
      </Link>
    </Article>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);

const Article = styled.article`
  width: 70%;
  margin: 2rem 0;
  align-self: ${(props) => props.alignSelf};

  & > a,
  & > a:visited {
    color: ${styleGuide.colorScheme.secondaryText};
    transition: all 0.15s;

    &:hover {
      color: ${styleGuide.colorScheme.text};
    }
  }
`;

const Title = styled.h2`
  ${"" /* font-size: 2rem;
  color: rgba(12, 17, 43);
  margin: 0;
  padding-top: 24px;
  padding-bottom: 8px;
  box-sizing: border-box; */}
`;

const Excerpt = styled.div`
  ${"" /* line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8); */}
`;
