import Badge from "./components/Badge.vue";
import BreadCrumb from "./components/BreadCrumb.vue";
import CodeGroup from "./components/CodeGroup.vue";
import CodeGroupItem from "./components/CodeGroupItem.vue";
import OutboundLink from "./components/OutboundLink.vue";
import Pagination from "./components/Pagination.vue";
import ScreenFull from "./components/ScreenFull.vue";

import type { ClientAppEnhance } from "@vuepress/client";

import "@mr-hope/vuepress-shared/styles/config/index.scss";

const clientAppEnhance: ClientAppEnhance = ({ app }) => {
  app.component("Badge", Badge);
  app.component("BreadCrumb", BreadCrumb);
  app.component("CodeGroup", CodeGroup);
  app.component("CodeGroupItem", CodeGroupItem);
  app.component("OutboundLink", OutboundLink);
  app.component("Pagination", Pagination);
  app.component("ScreenFull", ScreenFull);
};

export default clientAppEnhance;
