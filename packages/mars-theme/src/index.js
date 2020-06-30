import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import { ServerError } from "@frontity/source";

/* --------- CUSTOM HANDLERS --------- */

const removeCategoryBaseHandler = {
  // [IMPORTANT] This handler is created for wordpress.com sites
  // Not self-hosted sites don't have the permalinks settings and thus cannot change the category base
  // This way, we can remove the "/category" from the category routes without needing access to categoryBase
  // Sources:
  // https://community.frontity.org/t/how-to-remove-category-prefix-from-category-urls/817/3
  // https://github.com/frontity/frontity/blob/dev/packages/wp-source/src/libraries/handlers/postType.ts
  // https://github.com/frontity/frontity/blob/dev/packages/wp-source/src/libraries/handlers/taxonomy.ts
  name: "removeCategoryBaseHandler",
  priority: 19,
  // This pattern is gonna catch all routes
  // In our case, we only have categories and pages/posts
  pattern: "/(.*)?/:slug",
  func: async ({ link, route, params, state, libraries }) => {
    // 1 ---------> try with category <---------
    try {
      // FIRST, we retrieve the category handler
      const categoryHandler = libraries.source.handlers.find(
        (handler) => handler.name == "category"
      );

      // SECOND, we check the route, to see which kind we have:
      // Option A: "/category/:slug" - this will evaluate to TRUE
      // Option B: "/:slug" - this will evaluate to FALSE
      let isItCategoryRoute = /^\/category/.test(route);

      // THIRD, If the current route is of type "/:slug",
      // we need to create a route that follows the type "/category/:slug", as the handler expects it
      const categoryRoute = !isItCategoryRoute && `/category${route}`;

      // FOURTH, we call the function from the category handler, creating the right arguments
      let args = {
        route: categoryRoute || route,
        params: { 0: "category", slug: params.slug },
        state,
        libraries,
      };
      await categoryHandler.func(args);

      // FIFTH
      // Lastly, if our slug corresponded to a category (categoryHandler.func() suceeded) but it was of type "/:slug"
      // after the categoryHandler, we need to update the page data of our route ("/:slug")
      // with the page data from the route "/category/:slug", which is the one the handler updated
      if (!isItCategoryRoute) {
        const currentPageData = state.source.data[route];
        const newPageData = state.source.data[categoryRoute];
        Object.assign(currentPageData, newPageData);
      }
    } catch (e) {
      // 2 ---------> If it's not a category, check with pages (it works for posts too) <---------
      const pageHandler = libraries.source.handlers.find(
        (handler) => handler.name == "page"
      );
      await pageHandler.func({ link, params, state, libraries });
    }
  },
};

const publicPostsHandler = {
  // Done following these examples (source code and community):
  // https://github.com/frontity/frontity/blob/dev/packages/wp-source/src/libraries/handlers/postTypeArchive.ts
  // https://github.com/frontity/frontity/blob/ae5e3f9f1c1efbab865dafaf7c7ea1dfbaed8d9d/packages/wp-source/src/libraries/handlers/taxonomy.ts
  // https://community.frontity.org/t/how-to-create-custom-pages/435/3
  // https://community.frontity.org/t/how-to-remove-category-prefix-from-category-urls/817/3

  name: "publicPostsHandler",
  priority: 10,
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
      // 2. We retrieve the posts from the category "public"
      const response2 = await api.get({
        endpoint: `/posts`,
        params: { _embed: true, categories: `${publicCatId}`, per_page: 30 },
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
        items: publicPosts,
      });
    } else {
      throw new ServerError(
        "Something went wrong, there are no public posts",
        404
      );
    }
  },
};

/* --------- SETTINGS --------- */

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
      colorTheme: "light",
      doesUserHavePassword: false,
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
      toggleColorTheme: ({ state }) => {
        if (state.theme.colorTheme === "light") state.theme.colorTheme = "dark";
        else state.theme.colorTheme = "light";
      },
      savePassword: ({ state }) => (pw) => {
        // state.theme.doesUserHavePassword = true;
        state.source.params.password = pw;
      },
      init: ({ libraries }) => {
        // Add custom handlers to wp-source
        libraries.source.handlers.push(
          publicPostsHandler,
          removeCategoryBaseHandler
        );
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
