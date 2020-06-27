/* --------- STYLE GUIDE --------- */

export const styleGuide = {
  colorScheme: {
    accent: "#FFD4B2",
    background: "rgba(255, 255, 255, 0.8)",
    text: "#000"
  },
  textStyles: {
    title: {
      fontSize: "48px",
      fontWeight: "bold"
    },
    copy: {
      fontSize: "16px",
      lineHeight: 1.5
    },
    navItem: {
      fontSize: "32px",
      fontWeight: "bold"
    }
  },
  //We use the grid12Col function to add these styles to several elements, since using a class would cause some trouble
  //And to pinpoint every element in the Global component could be difficult because the structure (component tree) might change
  grid12Col: () => `display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;`
}