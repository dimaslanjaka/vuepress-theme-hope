<template>
    <div class="theme-options">
        <ul v-if="themeColorEnabled" class="themecolor-select">
            <label for="themecolor-select" v-text="`${text.themeColor}:`" />
            <li>
                <a class="default-theme" href="#" @click.prevent="setTheme()" />
            </li>
            <li v-for="color in themeColor.list" :key="color">
                <a :style="{ background: themeColor.picker[color] }" href="#" @click.prevent="setTheme(color)" />
            </li>
        </ul>
        <div v-if="switchEnabled" class="darkmode-toggle">
            <label class="desc" for="darkmode-toggle" v-text="`${text.themeMode}:`" />
            <DarkmodeSwitch />
            <!-- <ScreenFull /> -->
        </div>
    </div>
</template>

<script lang="ts">
import { useThemeLocaleData } from '@vuepress/client';
import { computed, defineComponent, ref, onMounted } from 'vue';
// import { getDefaultLocale } from "@mr-hope/vuepress-shared";
import DarkmodeSwitch from './DarkmodeSwitch.vue';
// import { HopeLangI18nConfig } from "@mr-hope/vuepress-shared";

const defaultColorPicker: Record<string, string> = {
    red: '#e74c3c',
    blue: '#3498db',
    green: '#3eaf7c',
    orange: '#f39c12',
    purple: '#8e44ad',
};

interface ThemeColor {
    /** Color list */
    list: string[];
    /** Color picker */
    picker: Record<string, string>;
}

export default defineComponent({
    name: 'ThemeOptions',

    components: { DarkmodeSwitch },

    setup() {
        const themeLocate = useThemeLocaleData();

        const isDarkmode = ref(false);

        const themeColor = computed<ThemeColor>(() => ({
            list: themeLocate.value.themeColor
                ? Object.keys(themeLocate.value.themeColor)
                : Object.keys(defaultColorPicker),
            picker: themeLocate.value.themeColor || defaultColorPicker,
        }));

        const themeColorEnabled = computed(() => themeLocate.value.themeColor !== false);

        const switchEnabled = computed(
            () => themeLocate.value.darkmode !== 'disable' && themeLocate.value.darkmode !== 'auto'
        );

        const text = computed(
            () => themeLocate.value.themeColor || ''
            // () => themeLocate.value.themeColor || getDefaultLocale().themeColor
        );

        const setTheme = (theme?: string): void => {
            const classes = document.body.classList;
            const themes = themeColor.value.list.map((colorTheme) => `theme-${colorTheme}`);

            if (!theme) {
                localStorage.removeItem('theme');
                classes.remove(...themes);

                return;
            }

            classes.remove(...themes.filter((themeclass) => themeclass !== `theme-${theme}`));

            classes.add(`theme-${theme}`);
            localStorage.setItem('theme', theme);
        };

        onMounted(() => {
            const theme = localStorage.getItem('theme');

            if (theme) setTheme(theme);
        });

        return {
            isDarkmode,
            text,
            setTheme,
            switchEnabled,
            themeColor,
            themeColorEnabled,
        };
    },
});
</script>

<style lang="stylus">
@require '../../styles/palette'

.theme-options
  font-size 14px

  .themecolor-select
    display flex
    justify-content space-around

    label
      padding-right 8px

    li
      &:first-child
        margin-right 8px

      a
        vertical-align middle
        width 15px
        height 15px
        margin 0 2px
        border-radius 2px

        &.default-theme
          background $accentColor // must be fixed to the original accent-color

  .darkmode-toggle
    display flex
    align-items center
    margin-top 8px

    .desc
      padding-right 8px
      line-height 1.5

    .full-screen, .cancel-full-screen
      margin-left 0.5em
</style>
