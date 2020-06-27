import { css } from "frontity";
import { styleGuide } from "./style-guide";

const cssReset = css`
  ${"" /* I have adapted the reset stylesheet from: https://dev.to/hankchizljaw/a-modern-css-reset-6p3 */}
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  ul[class],
  ol[class] {
    padding: 0;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    font-family: "Playfair Display", serif;
    color: ${styleGuide.colorScheme.text};
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  ul[class],
  ol[class] {
    list-style: none;
  }

  /* Remove the underline from links */
  a,
  a:visited {
    text-decoration: none;
    color: ${styleGuide.colorScheme.text};
  }

  /* Make images easier to work with */
  img {
    max-width: 100%;
    display: block;
  }

  /* Natural flow and rhythm in articles by default */
  article > * + * {
    margin-top: 1em;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

const title = css`
  h1 {
    font-size: ${styleGuide.textStyles.title.fontSize};
    font-weight: ${styleGuide.textStyles.title.fontWeight};
  }
`;

const copy = css`
  p {
    font-size: ${styleGuide.textStyles.copy.fontSize};
    font-height: ${styleGuide.textStyles.copy.lineHeight};
  }
`;

const nav = css`
  nav a,
  nav a:visited {
    font-size: ${styleGuide.textStyles.navItem.fontSize};
    font-weight: ${styleGuide.textStyles.navItem.fontWeight};
    color: ${styleGuide.colorScheme.accent};

    &:hover {
      color: ${styleGuide.colorScheme.text};
    }

    &[aria-current="page"] {
      color: ${styleGuide.colorScheme.text};
    }
  }
`;

const globalStyles = () => css([cssReset, title, copy, nav]);

export default globalStyles;
