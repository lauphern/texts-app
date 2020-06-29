import { css } from "frontity";
import { styleGuide } from "./style-guide";

const cssReset = colorTheme => css`
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

  html, body {
    height: 100%;
    overflow: hidden;
  }

  /* Set core body defaults */
  body {
    background: ${styleGuide.colorScheme[colorTheme].background};
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    font-family: "Playfair Display", serif;
    color: ${styleGuide.colorScheme[colorTheme].text};
    padding: 0 0 0 2vw;
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
    color: ${styleGuide.colorScheme[colorTheme].text};
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
  h2 {
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

const nav = colorTheme => css`
  nav a,
  nav a:visited {
    font-size: ${styleGuide.textStyles.navItem.fontSize};
    font-weight: ${styleGuide.textStyles.navItem.fontWeight};
    color: ${styleGuide.colorScheme[colorTheme].accent};

    &:hover {
      color: ${styleGuide.colorScheme[colorTheme].text};
    }

    &[aria-current="page"] {
      color: ${styleGuide.colorScheme[colorTheme].text};
    }
  }
`;

const globalStyles = colorTheme => css([cssReset(colorTheme), title, copy, nav(colorTheme)]);

export default globalStyles;
