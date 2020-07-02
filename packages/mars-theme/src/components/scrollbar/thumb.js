import { styled } from "frontity"

import { styleGuide } from "../styles/style-guide"

const Thumb = styled.div(
  (props) => `
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${styleGuide.colorScheme[props.colorTheme].accent};
  pointer-events: initial;
  position: absolute;
  transform-origin: top left;
  top: 0;
  left: 0;
  cursor: pointer;

  &:hover:before {
    transform: scale(1.2);
  }

  &:before{
    content: "";
    background-color: ${styleGuide.colorScheme[props.colorTheme].accent};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    transition: all 0.15s;
  }
`
);

export default Thumb;