import React from "react";
import { connect, styled, decode } from "frontity";
import Item from "./list-item";
import Pagination from "./pagination";

import styleGuide from "../styles/style-guide";

const List = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);

  return (
    <>
      <Container>
        {/* Iterate over the items of the list. */}
        {data.items.map(({ type, id }, index) => {
          const item = state.source[type][id];
          let isItLastItem = false;
          if (data.items.length === index + 1) isItLastItem = true;
          // Render one Item component for each one.
          return index % 2 === 0 ? (
            <Item
              key={item.id}
              item={item}
              alignSelf={"flex-start"}
              isItLastItem={isItLastItem}
            />
          ) : (
            <Item
              key={item.id}
              item={item}
              alignSelf={"flex-end"}
              isItLastItem={isItLastItem}
            />
          );
        })}
        <Pagination />
      </Container>
    </>
  );
};

export default connect(List);

const Container = styled.section`
  ${"" /* width: 800px;
  margin: 0;
  padding: 24px;
  list-style: none; */}
  grid-area: 1 / 2 / 2 / 13;
  display: flex;
  flex-direction: column;
`;