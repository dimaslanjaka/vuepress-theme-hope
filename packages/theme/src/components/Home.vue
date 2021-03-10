<template>
  <main class="home" :aria-labelledby="heroText ? 'main-title' : null">
    <header class="hero">
      <DropTransition>
        <img
          v-if="heroImage"
          key="light"
          :class="{ light: Boolean(darkHeroImage) }"
          :src="heroImage"
          :alt="$frontmatter.heroAlt || 'HomeLogo'"
        />
        <img
          v-else-if="darkHeroImage"
          key="dark"
          class="dark"
          :src="darkHeroImage"
          :alt="$frontmatter.heroAlt || 'HomeLogo'"
        />
      </DropTransition>

      <div class="hero-info">
        <DropTransition v-if="heroText" :delay="0.04">
          <h1 id="main-title" v-text="heroText" />
        </DropTransition>
        <DropTransition v-if="tagline" :delay="0.08">
          <p class="description" v-text="tagline" />
        </DropTransition>
        <DropTransition :delay="0.12">
          <p v-if="actions.length" class="actions">
            <NavLink
              v-for="action in actions"
              :key="action.text"
              class="action-button"
              :class="action.type"
              :item="action"
            />
          </p>
        </DropTransition>
      </div>
    </header>

    <DropTransition :delay="0.16">
      <div v-if="features.length" class="features">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feature"
          :class="{ link: feature.link }"
          @click="feature.link ? navigate(feature.link) : ''"
        >
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.details }}</p>
        </div>
      </div>
    </DropTransition>

    <DropTransition :delay="0.24">
      <div class="theme-default-content custom">
        <Content />
      </div>
    </DropTransition>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from "@vuepress/client";
import { isArray } from "@vuepress/shared";
import DropTransition from "./DropTransition.vue";
import NavLink from "./NavLink.vue";

import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";

interface ActionConfig {
  text: string;
  link: string;
  type?: "primary" | "secondary";
}

interface HomePageFrontmatter extends BasePageFrontMatter {
  home: true;
  heroImage?: string;
  darkHeroImage?: string;
  heroAlt?: string;
  heroText?: string;
  tagline?: string;
  actions?: ActionConfig[];
  features?: {
    title: string;
    details: string;
  }[];
}

export default defineComponent({
  name: "Home",

  components: {
    DropTransition,
    NavLink,
  },

  setup() {
    const frontmatter = usePageFrontmatter<HomePageFrontmatter>();
    const siteLocale = useSiteLocaleData();

    const heroImage = computed(() => {
      if (!frontmatter.value.heroImage) return null;

      return withBase(frontmatter.value.heroImage);
    });

    const darkHeroImage = computed(() => {
      if (!frontmatter.value.darkHeroImage) return null;

      return withBase(frontmatter.value.darkHeroImage);
    });

    const heroText = computed(() => {
      if (frontmatter.value.heroText === null) return null;

      return frontmatter.value.heroText || siteLocale.value.title || "Hello";
    });

    const heroAlt = computed(
      () => frontmatter.value.heroAlt || heroText.value || "hero"
    );

    const tagline = computed(() => {
      if (frontmatter.value.tagline === null) return null;

      return (
        frontmatter.value.tagline ||
        siteLocale.value.description ||
        "Welcome to your VuePress site"
      );
    });

    const actions = computed(() => {
      if (!isArray(frontmatter.value.actions)) return [];

      return frontmatter.value.actions.map(
        ({ text, link, type = "primary" }) => ({
          text,
          link,
          type,
        })
      );
    });

    const features = computed(() => {
      if (isArray(frontmatter.value.features))
        return frontmatter.value.features;

      return [];
    });

    return {
      darkHeroImage,
      heroImage,
      heroAlt,
      heroText,
      tagline,
      actions,
      features,
    };
  },
});
</script>

<style lang="scss">
@use '~@mr-hope/vuepress-shared/styles/colors';

.home {
  display: block;
  max-width: $homePageWidth;
  min-height: 100vh - $navbarHeight;
  padding: $navbarHeight 2rem 0;
  margin: 0px auto;

  @media (max-width: $MQNarrow) {
    min-height: 100vh - $navbarMobileHeight;
    padding-top: $navbarMobileHeight;
  }

  @media (max-width: $MQMobileNarrow) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .hero {
    text-align: center;

    @media (min-width: $MQNarrow) {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      text-align: left;
    }

    img {
      display: block;
      max-width: 100%;
      max-height: 320px;
      margin: 0;

      @media (max-width: $MQNarrow) {
        max-height: 280px;
        margin: 3rem auto 1.5rem;
      }

      @media (max-width: $MQMobile) {
        max-height: 240px;
        margin: 2rem auto 1.2rem;
      }

      @media (max-width: $MQMobileNarrow) {
        max-height: 210px;
        margin: 1.5rem auto 1rem;
      }

      .theme-light & {
        &.light {
          display: block;
        }

        &.dark {
          display: none;
        }
      }

      .theme-dark & {
        &.light {
          display: none;
        }

        &.dark {
          display: block;
        }
      }
    }

    h1 {
      font-size: 3rem;

      @media (max-width: $MQMobile) {
        font-size: 2.5rem;
      }

      @media (max-width: $MQMobileNarrow) {
        font-size: 2rem;
      }
    }

    h1,
    .description,
    .action {
      margin: 1.8rem auto;

      @media (max-width: $MQMobile) {
        margin: 1.5rem auto;
      }

      @media (max-width: $MQMobileNarrow) {
        margin: 1.2rem auto;
      }
    }

    .description {
      max-width: 35rem;
      color: var(--text-color-l40);
      font-size: 1.6rem;
      line-height: 1.3;

      @media (max-width: $MQMobile) {
        font-size: 1.4rem;
      }

      @media (max-width: $MQMobileNarrow) {
        font-size: 1.2rem;
      }
    }

    .action-button {
      display: inline-block;
      margin: 0.6rem 0.8rem;
      padding: 1rem 1.5rem;
      border: 2px solid var(--accent-color);
      border-radius: 2rem;
      color: var(--accent-color);
      font-size: 1.2rem;
      transition: background 0.1s ease;
      overflow: hidden;

      @media (max-width: $MQMobile) {
        padding: 0.8rem 1.2rem;
        font-size: 1.1rem;
      }

      @media (max-width: $MQMobileNarrow) {
        padding: 0.6rem 1rem;
        font-size: 1rem;
      }

      &:hover {
        color: var(--white);
        background-color: var(--accent-color);
      }

      &.primary {
        color: var(--white);
        background-color: var(--accent-color);

        &:hover {
          border-color: var(--accent-color-l10);
          background-color: var(--accent-color-l10);
        }

        .theme-dark & {
          &:hover {
            border-color: var(--accent-color-d10);
            background-color: var(--accent-color-d10);
          }
        }
      }
    }
  }

  .features {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
    margin: 0 -2rem;
    padding: 1.2rem 0;
    border-top: 1px solid $borderColor;

    @media (max-width: $MQMobileNarrow) {
      margin: 0 -1.5rem;
    }

    .feature {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-basis: calc(33% - 4rem);
      margin: 0.5rem;
      padding: 0 1.5rem;
      border-radius: 0.5rem;
      transition: transform 0.3s, box-shadow 0.3s;
      overflow: hidden;

      @media (max-width: $MQNarrow) {
        flex-basis: calc(50% - 4rem);
      }

      @media (max-width: $MQMobile) {
        font-size: 0.95rem;
      }

      @media (max-width: $MQMobileNarrow) {
        flex-basis: calc(100%);
        font-size: 0.9rem;
        margin: 0.5rem 0;
        border-radius: 0;
      }

      &.link {
        cursor: pointer;
      }

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 12px 0 var(--card-shadow-color);
      }

      h2 {
        margin-bottom: 0.25rem;
        border-bottom: none;
        color: var(--text-color-l10);
        font-size: 1.25rem;
        font-weight: 500;

        @media (max-width: $MQMobileNarrow) {
          font-size: 1.2rem;
        }
      }

      p {
        margin-top: 0;
        color: var(--text-color-l25);
      }
    }
  }

  #{$contentClass} {
    padding-bottom: 1.5rem;
  }
}

@each $color in $colors {
  .home .features .feature#{list.index($colors,$color) - 1} {
    &,
    .theme-light & {
      background: color.scale($color, $lightness: 90%);
    }

    .theme-dark & {
      background: color.scale($color, $lightness: -75%);
    }
  }
}
</style>
