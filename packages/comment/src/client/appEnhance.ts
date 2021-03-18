import Comment from "./components/Comment.vue";
import PageInfo from "./components/PageInfo.vue";

import type { ClientAppEnhance } from "@vuepress/client";

import "./styles/index.scss";

const enhanceApp: ClientAppEnhance = ({ app }) => {
  app.component("Comment", Comment);
  app.component("PageInfo", PageInfo);
};

export default enhanceApp;
