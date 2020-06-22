import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import { ServerError } from "@frontity/source";

const publicPostsHandler = {
  // Done following these examples (source code and community):
  // https://github.com/frontity/frontity/blob/dev/packages/wp-source/src/libraries/handlers/postTypeArchive.ts
  // https://github.com/frontity/frontity/blob/ae5e3f9f1c1efbab865dafaf7c7ea1dfbaed8d9d/packages/wp-source/src/libraries/handlers/taxonomy.ts
  // https://community.frontity.org/t/how-to-create-custom-pages/435/3
  // https://community.frontity.org/t/how-to-remove-category-prefix-from-category-urls/817/3

  name: "publicPostsHandler",
  priority: 10,
  //TODO try to change the pattern. If I can't make it work here, maybe in redirections:
  //https://docs.frontity.org/api-reference-1/wordpress-source#libraries
  // pattern: /^$/g,
  // pattern: "/home",
  pattern: "/",
  func: async ({ route, params, state, libraries }) => {
    
    const { api, populate } = libraries.source;

    // Source code of the get method https://github.com/frontity/frontity/blob/ae5e3f9f1c1efbab865dafaf7c7ea1dfbaed8d9d/packages/wp-source/src/libraries/api.ts#L17
    // 1. We get the list of categories to find the id of the category "public"
    const response1 = await api.get({
      endpoint: "categories",
      params: {
        per_page: 100,
        orderby: "count",
        order: "desc",
      },
    });

    // 2. get an array with each item in json format
    const categories = await response1.json();

    const publicCat = categories.find((cat) => cat.slug === "public");

    if (publicCat) {
      const publicCatId = publicCat.id;
      // 2. We retrieve the comments from the category "public"
      const response2 = await api.get({
        endpoint: `/posts?categories=${publicCatId}`,
      });

      // 3. Populate the state with the public posts
      // Code source of populate method: https://github.com/frontity/frontity/blob/ae5e3f9f1c1efbab865dafaf7c7ea1dfbaed8d9d/packages/wp-source/src/libraries/populate.ts#L34
      // And docs: https://docs.frontity.org/api-reference-1/wordpress-source#libraries
      const publicPosts = await populate({
        response: response2,
        state,
        force: true,
      });

      // 4. We add the public posts to the state (inside the route) and change the isArchive property to true to use the List component in this route
      state.source.data[route].isArchive = true;

      const currentPageData = state.source.data[route];

      Object.assign(currentPageData, {
        items: publicPosts
      });
    } else {
      throw new ServerError(
        "Something went wrong, there are no public posts",
        404
      );
    }
  },
};

export default {
  name: "@frontity/mars-theme",
  roots: {
    /**
     *  In Frontity, any package can add React components to the site.
     *  We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },
  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      // TODO añadir aquí para toggleThemeMode (dark y light) y toggleLanguage (esp y eng)
      init: ({ libraries }) => {
        // Add the handler to wp-source.
        libraries.source.handlers.push(publicPostsHandler);
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * inside the content HTML. You can add your own processors too
       */
      processors: [image, iframe],
    },
  },
};
