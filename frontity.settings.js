import { config } from "dotenv";

// Launch dot-env.
config();

const settings = {
  "name": "texts-app",
  "state": {
    "frontity": {
      "url": "https://cristina-escritora.vercel.app",
      "title": "Cristina N.",
      "description": "Historias en las que no ocurre nada"
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
              "Zona secreta",
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
          "api": process.env.PACKAGES_STATE_API,
          "params": {
            "per_page": 30,
            "force": true
          }
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
