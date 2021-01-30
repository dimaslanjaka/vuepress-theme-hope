import { useThemeData } from "@vuepress/client";
import { computed } from "vue";
import type { ComputedRef } from "vue";

export type PluginConfigRef<T> = ComputedRef<T>;

export interface PluginConfigConvert<T> {
  plugins?: {
    [key: string]: T;
  };
}

export const useThemePluginConfig = <T>(key: string): PluginConfigRef<T> =>
  computed<T>(() => {
    const { plugins } = useThemeData<PluginConfigConvert<T>>().value;

    if (plugins) return plugins[key];

    return {} as T;
  });
