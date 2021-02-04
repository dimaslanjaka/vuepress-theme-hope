import AddThis from "./AddThis";

import type { ClientAppEnhance } from "@vuepress/client";

const enhanceApp: ClientAppEnhance = ({ app }) => {
  app.component("AddThis", AddThis);
};

export default enhanceApp;
