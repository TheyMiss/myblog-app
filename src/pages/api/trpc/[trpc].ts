import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "../../../server/createContext";
import { AppRouter } from "../../../server/route/app.router";

export default trpcNext.createNextApiHandler({
  router: AppRouter,

  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.log("Something went wrong!", error);
    } else {
      console.error(error);
    }
  },
});
