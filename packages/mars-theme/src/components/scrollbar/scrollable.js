import { styled } from "frontity";

import { styleGuide } from "../styles/style-guide";

const Scrollable = styled.div(
  (props) => `
  background-color: ${styleGuide.colorScheme[props.colorTheme].background};
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  position: relative;
  -webkit-overflow-scrolling: touch;
`);

export default Scrollable;
