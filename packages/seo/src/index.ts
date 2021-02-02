import { resolvePagePermalink } from "@vuepress/core";
import { resolveSiteLocaleData } from "@vuepress/client";
import { generateRobotsTxt, generateSeo } from "./seo";
import { appendMeta } from "./meta";
// import { getLocales } from "./utils";

import type { Page, Plugin } from "@vuepress/core";
import type { PageSeoInfo, SeoContent, SeoOptions } from "./types";

export const seoPlugin: Plugin<SeoOptions> = (options, app) => {
  const { base, themeConfig } = app.options;

  const seoOption =
    Object.keys(options).length > 0
      ? options
      : (themeConfig.seo as SeoOptions) || {};

  return {
    name: "seo",

    extendsPageData(page): void {
      const meta = page.frontmatter.head || [];
      const siteLocale = resolveSiteLocaleData(app.options, page.pathLocale);
      const pageSeoInfo: PageSeoInfo = {
        page: page as Page & { lastUpdatedTime?: number } & Record<
            string,
            unknown
          >,
        app,
        lang: siteLocale.lang,
        siteLocale,
        permalink: resolvePagePermalink({
          ...page,
          options: {},
        }),
      };
      const metaContext: SeoContent = {
        ...generateSeo(seoOption, base, pageSeoInfo),
        ...(seoOption.seo ? seoOption.seo(pageSeoInfo) : {}),
      };

      appendMeta(meta, metaContext, seoOption);
      if (seoOption.customHead) seoOption.customHead(meta, pageSeoInfo);

      page.frontmatter.meta = meta;
    },

    async generated(): Promise<void> {
      await generateRobotsTxt(app.dir);
    },

    plugins: [
      ["@mr-hope/last-update", themeConfig.lastUpdate || true],

      ["@vuepress/last-updated", false],
    ],
  };
};

export default seoPlugin;
