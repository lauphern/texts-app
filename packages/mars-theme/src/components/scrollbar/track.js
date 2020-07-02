import { styled } from "frontity";

import { styleGuide } from "../styles/style-guide";

const Track = styled.div(
  (props) => `
  background-color: ${styleGuide.colorScheme[props.colorTheme].accent};
  position: absolute;
  top: 0;
  left: 0;
  width: 1.5px;
  height: calc(100% - 10px);
  margin: 5px 0 0 4.25px;
`
);

export default Track;
