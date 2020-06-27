import React from "react";
import { connect, styled } from "frontity";

//TODO
//check this https://developers.google.com/web/updates/2017/03/custom-scrollbar

const Scrollbar = ({ state }) => {
  return (
    <ScrollbarContainer>
      <Line />
      <Dot />
    </ScrollbarContainer>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Scrollbar);

const ScrollbarContainer = styled.div`
  grid-area: 1 / 1 / 2 / 3;
`;

const Line = styled.div``;

const Dot = styled.div``;
