import type { ClientAppEnhance } from "@vuepress/client";
// import BreadCrumb from "./components/BreadCrumb.vue";
// import MyBadge from "./components/MyBadge.vue";
import Pagination from "./components/Pagination.vue";
import ScreenFull from "./components/ScreenFull.vue";
import "@mr-hope/vuepress-shared/styles/config/index.scss";

const clientAppEnhance: ClientAppEnhance = ({ app }) => {
  // app.component("BreadCrumb", BreadCrumb);
  // app.component("MyBadge", MyBadge);
  app.component("Pagination", Pagination);
  app.component("ScreenFull", ScreenFull);
};

export default clientAppEnhance;
