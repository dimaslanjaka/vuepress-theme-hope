import type { LangPaths } from "@mr-hope/vuepress-shared";

export type ContainerName = "info" | "tip" | "warning" | "danger" | "detail";

export const i18n: Record<ContainerName, Record<LangPaths, string>> = {
  info: {
    "/zh/": "相关信息",
    "/en/": "Info",
    "/vi/": "Thông tin",
  },
  tip: {
    "/zh/": "提示",
    "/en/": "Tips",
    "/vi/": "Tips",
  },
  warning: {
    "/zh/": "注意",
    "/en/": "Note",
    "/vi/": "Lưu ý",
  },
  danger: {
    "/zh/": "警告",
    "/en/": "Warning",
    "/vi/": "Cẩn thận",
  },
  detail: {
    "/zh/": "详情",
    "/en/": "Detail",
    "/vi/": "Chi tiết",
  },
};
