import { styled } from "frontity";

import { styleGuide } from "../styles/style-guide";

const Track = styled.div`
  background-color: ${styleGuide.colorScheme.light.accent};
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: calc(100% - 10px);
  margin: 5px 0 0 4.25px;
`;

export default Track;
