import React from "react";
import { Global, css, connect } from "frontity";
import PlayfairDisplayBlack from "../../fonts/playfair-display/PlayfairDisplay-Black.ttf";
import PlayfairDisplayBlackItalic from "../../fonts/playfair-display/PlayfairDisplay-BlackItalic.ttf";
import PlayfairDisplayBold from "../../fonts/playfair-display/PlayfairDisplay-Bold.ttf";
import PlayfairDisplayBoldItalic from "../../fonts/playfair-display/PlayfairDisplay-BoldItalic.ttf";
import PlayfairDisplayExtraBold from "../../fonts/playfair-display/PlayfairDisplay-ExtraBold.ttf";
import PlayfairDisplayExtraBoldItalic from "../../fonts/playfair-display/PlayfairDisplay-ExtraBoldItalic.ttf";
import PlayfairDisplayItalic from "../../fonts/playfair-display/PlayfairDisplay-Italic.ttf";
import PlayfairDisplayMedium from "../../fonts/playfair-display/PlayfairDisplay-Medium.ttf";
import PlayfairDisplayMediumItalic from "../../fonts/playfair-display/PlayfairDisplay-MediumItalic.ttf";
import PlayfairDisplayRegular from "../../fonts/playfair-display/PlayfairDisplay-Regular.ttf";
import PlayfairDisplaySemiBold from "../../fonts/playfair-display/PlayfairDisplay-SemiBold.ttf";
import PlayfairDisplaySemiBoldItalic from "../../fonts/playfair-display/PlayfairDisplay-SemiBoldItalic.ttf";

import NewsCycleRegular from "../../fonts/news-cycle/NewsCycle-Regular.ttf";
import NewsCycleBold from "../../fonts/news-cycle/NewsCycle-Bold.ttf";

const fonts = [
  PlayfairDisplayRegular,
  PlayfairDisplayItalic,
  PlayfairDisplayMedium,
  PlayfairDisplayMediumItalic,
  PlayfairDisplaySemiBold,
  PlayfairDisplaySemiBoldItalic,
  PlayfairDisplayBold,
  PlayfairDisplayBoldItalic,
  PlayfairDisplayExtraBold,
  PlayfairDisplayExtraBoldItalic,
  PlayfairDisplayBlack,
  PlayfairDisplayBlackItalic,
  NewsCycleRegular,
  NewsCycleBold
];

const FontFace = ({ state }) => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Playfair Display";
          font-style: normal;
          font-weight: 400;
          font-display: "swap";
          src: url(${fonts[0]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: italic;
          font-weight: 400;
          font-display: "swap";
          src: url(${fonts[1]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: normal;
          font-weight: 500;
          font-display: "swap";
          src: url(${fonts[2]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: italic;
          font-weight: 500;
          font-display: "swap";
          src: url(${fonts[3]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: normal;
          font-weight: 600;
          font-display: "swap";
          src: url(${fonts[4]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: italic;
          font-weight: 600;
          font-display: "swap";
          src: url(${fonts[5]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: normal;
          font-weight: 700;
          font-display: "swap";
          src: url(${fonts[6]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: italic;
          font-weight: 700;
          font-display: "swap";
          src: url(${fonts[7]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: normal;
          font-weight: 800;
          font-display: "swap";
          src: url(${fonts[8]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: italic;
          font-weight: 800;
          font-display: "swap";
          src: url(${fonts[9]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: normal;
          font-weight: 900;
          font-display: "swap";
          src: url(${fonts[10]}) format("truetype");
        }
        @font-face {
          font-family: "Playfair Display";
          font-style: italic;
          font-weight: 900;
          font-display: "swap";
          src: url(${fonts[11]}) format("truetype");
        }
        @font-face {
          font-family: "News Cycle";
          font-style: normal;
          font-weight: 400;
          font-display: "swap";
          src: url(${fonts[12]}) format("truetype");
        }
        @font-face {
          font-family: "News Cycle";
          font-style: bold;
          font-weight: 700;
          font-display: "swap";
          src: url(${fonts[13]}) format("truetype");
        }
      `}
    />
  );
};

export default connect(FontFace);
