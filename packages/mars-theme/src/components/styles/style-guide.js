/* --------- STYLE GUIDE --------- */

//TODO
// [!] Note: I would like to find a better way to use this object so it's connected to the state
// But if I add it in the frontity settings, the way to pass the values to the styled components is very verbose
// Source from emotion package: https://emotion.sh/docs/styled

export const styleGuide = {
  colorScheme: {
    light: {
      // accent: "#FFD4B2",
      // accent: "rgb(219,124,178)",
      accent: "#B6A6FF",
      background: "#FFF",
      text: "#000",
      // secondaryText: "#c4c4c4",
      secondaryText: "rgb(140,140,140)",
    },
    dark: {
      // accent: "#FFD4B2",
      // accent: "rgb(219,124,178)",
      accent: "#B6A6FF",
      background: "rgb(50,50,50)",
      text: "#FFF",
      secondaryText: "#c4c4c4",
    },
  },
  textStyles: {
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    copy: {
      fontSize: "16px",
      lineHeight: 1.7,
      fontWeight: 300,
    },
    navItem: {
      fontSize: "1rem",
      fontWeight: 300,
    },
  },
  //We use the grid12Col function to add these styles to several elements, since using a class would cause some trouble
  //And to pinpoint every element in the Global component could be difficult because the structure (component tree) might change
  grid12Col: () => `display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;`,
};
