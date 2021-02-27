import { provide } from "vue";

import type { ReadingTimeI18nConfig } from "../shared";
import type { ClientAppSetup } from "@vuepress/client";

declare const READING_TIME_I18N: Record<string, ReadingTimeI18nConfig>;

const clientAppSetup: ClientAppSetup = () => {
  provide("reading-time-i18n", READING_TIME_I18N);
};

export default clientAppSetup;
