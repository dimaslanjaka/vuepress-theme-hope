import { onMounted, onUpdated } from "vue";
import { initDemo } from "./demo";
import type { ClientAppSetup } from "@vuepress/client";
import "./styles/code-demo.scss";

const clientAppSetup: ClientAppSetup = () => {
  onMounted(() => {
    initDemo();
  });
  onUpdated(() => {
    initDemo();
  });
};

export default clientAppSetup;
