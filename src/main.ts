import { ViteSSG } from "vite-ssg";
import autoRoutes from "pages-generated";
import { setupRouterScroller } from "vue-router-better-scroller";
import { start, close } from "~/utils/nprogress";
import "./style.scss";
import App from "./App.vue";

const routes = autoRoutes.map((i) => {
  console.log(i);

  return {
    ...i,
    alias: i.path.endsWith("/") ? `${i.path}index.html` : `${i.path}.html`,
  };
});

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, isClient }) => {
    if (isClient) {
      const html = document.querySelector("html")!;
      setupRouterScroller(router, {
        selectors: {
          html(ctx) {
            if (ctx.savedPosition?.top) html.classList.add("no-sliding");
            else html.classList.remove("no-sliding");
            return true;
          },
        },
        behavior: "auto",
      });
      router.beforeEach(() => {
        start();
      });
      router.afterEach(() => {
        close();
      });
    }
  }
);
