<template>
    <div v-if="mediaLink" class="media-links-wrapper">
        <a
            v-for="link in links"
            :key="link.name"
            class="media-link"
            :href="link.url"
            rel="noopener noreferrer"
            target="_blank"
            :aria-label="link.icon"
            data-balloon-pos="up"
        >
            <span class="sr-only" v-text="link.icon" />
            <component :is="link.icon" />
        </a>
    </div>
</template>

<script lang="ts">
import { usePageFrontmatter } from '@vuepress/client';
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client';
import { computed, defineComponent } from 'vue';
import type { ThemeHopeOptions } from '../../types';
import Baidu from './icons/Baidu.vue';
import Bitbucket from './icons/Bitbucket.vue';
import Dingding from './icons/Dingding.vue';
import Discord from './icons/Discord.vue';
import Dribbble from './icons/Dribbble.vue';
import Evernote from './icons/Evernote.vue';
import Facebook from './icons/Facebook.vue';
import Flipboard from './icons/Flipboard.vue';
import Gitee from './icons/Gitee.vue';
import Github from './icons/Github.vue';
import Gitlab from './icons/Gitlab.vue';
import Gmail from './icons/Gmail.vue';
import Instagram from './icons/Instagram.vue';
import Lines from './icons/Lines.vue';
import Linkedin from './icons/Linkedin.vue';
import Pinterest from './icons/Pinterest.vue';
import Pocket from './icons/Pocket.vue';
import QQ from './icons/QQ.vue';
import Qzone from './icons/Qzone.vue';
import Reddit from './icons/Reddit.vue';
import Rss from './icons/Rss.vue';
import Steam from './icons/Steam.vue';
import Twitter from './icons/Twitter.vue';
import Wechat from './icons/Wechat.vue';
import Weibo from './icons/Weibo.vue';
import Whatsapp from './icons/Whatsapp.vue';
import Youtube from './icons/Youtube.vue';
import Zhihu from './icons/Zhihu.vue';
import type { BlogMedia } from '../../types';

const medias: BlogMedia[] = [
    'Baidu',
    'Bitbucket',
    'Dingding',
    'Discord',
    'Dribbble',
    'Evernote',
    'Facebook',
    'Flipboard',
    'Gitee',
    'Github',
    'Gitlab',
    'Gmail',
    'Instagram',
    'Lines',
    'Linkedin',
    'Pinterest',
    'Pocket',
    'QQ',
    'Qzone',
    'Reddit',
    'Rss',
    'Steam',
    'Twitter',
    'Wechat',
    'Weibo',
    'Whatsapp',
    'Youtube',
    'Zhihu',
];

interface MediaLink {
    icon: string;
    url: string;
}

export default defineComponent({
    name: 'MediaLinks',

    components: {
        Baidu,
        Bitbucket,
        Dingding,
        Discord,
        Dribbble,
        Evernote,
        Facebook,
        Flipboard,
        Gitee,
        Github,
        Gitlab,
        Gmail,
        Instagram,
        Lines,
        Linkedin,
        Pinterest,
        Pocket,
        QQ,
        Qzone,
        Reddit,
        Rss,
        Steam,
        Twitter,
        Wechat,
        Weibo,
        Whatsapp,
        Youtube,
        Zhihu,
    },

    setup() {
        const frontmatter = usePageFrontmatter();
        const themeLocale = useThemeLocaleData<ThemeHopeOptions>();

        const mediaLink = computed<Partial<Record<BlogMedia, string>> | false>(() => {
            const { medialink } = frontmatter.value;

            return medialink === false
                ? false
                : typeof medialink === 'object'
                ? (medialink as Partial<Record<BlogMedia, string>>)
                : themeLocale.value.blog
                ? themeLocale.value.blog.links || false
                : false;
        });

        const links = computed<MediaLink[]>(() => {
            if (mediaLink.value) {
                const links: MediaLink[] = [];

                for (const media in mediaLink.value)
                    if (medias.includes(media as BlogMedia))
                        links.push({
                            icon: media,
                            url: mediaLink.value[media as BlogMedia] as string,
                        });

                return links;
            }

            return [];
        });

        return {
            links,
            mediaLink,
        };
    },
});
</script>

<style lang="scss">
.media-links-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 8px auto;

    .media-link {
        width: 26px;
        height: 26px;
        margin: 4px;
        transform: scale(1, 1);
        transition: transform 0.18s ease-out 0.18s;

        &:hover {
            cursor: pointer;
            transform: scale(1.2, 1.2);
        }

        &::after {
            --balloon-font-size: 8px;
            padding: 0.3em 0.6em;
        }

        .icon {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
