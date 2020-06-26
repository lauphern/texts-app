import { config } from "dotenv";

// Launch dot-env.
config();

const settings = {
  "name": "texts-app",
  "state": {
    "frontity": {
      "url": "https://texts-app-rouge.vercel.app",
      "title": "Texts app",
      "description": "Una colección de textos sobre la vida, por Cristina N."
    },
    "source": {
      // "homepage": "/home",
      // "postsPage": "/posts-page",
    },
  },
  "packages": [
    {
      "name": "@frontity/mars-theme",
      "state": {
        "theme": {
          "menu": [
            [
              "Home",
              "/"
            ],
            [
              "Zona prohibida",
              "/hidden/"
            ],
            [
              "Sobre mí",
              "/sobre-mi/"
            ]
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "api": process.env.PACKAGES_STATE_API
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
