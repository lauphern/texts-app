import { styled } from "frontity";

const PerspectiveCtr = styled.div`
  perspective-origin: top left;
  transform-style: preserve-3d;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
  padding-right: 2vw;
  padding-bottom: 10vw;
`;

export default PerspectiveCtr;
