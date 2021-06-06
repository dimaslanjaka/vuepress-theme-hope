/**
 * 合法的媒体
 *
 * media you can choose
 */
export type BlogMedia =
    | 'Baidu'
    | 'Bitbucket'
    | 'Dingding'
    | 'Discord'
    | 'Dribbble'
    | 'Evernote'
    | 'Facebook'
    | 'Flipboard'
    | 'Gitee'
    | 'Github'
    | 'Gitlab'
    | 'Gmail'
    | 'Instagram'
    | 'Lines'
    | 'Linkedin'
    | 'Pinterest'
    | 'Pocket'
    | 'QQ'
    | 'Qzone'
    | 'Reddit'
    | 'Rss'
    | 'Steam'
    | 'Twitter'
    | 'Wechat'
    | 'Weibo'
    | 'Whatsapp'
    | 'Youtube'
    | 'Zhihu';

/**
 * 博客选项
 *
 * Blog configuration
 */
export type BlogOptions = {
    /**
     * 博主名称
     *
     * Name of the Blogger, default is author
     */
    name?: string;
    /**
     * 博主头像，应为绝对路径
     *
     * Blogger avator, must be an absolute path
     */
    avatar?: string;
    /**
     * 是否在侧边栏展示博主信息
     *
     * Whether to display blogger info in sidebar
     *
     * @default 'none'
     */
    showInSidebar?: 'mobile' | 'none' | 'always';
    /**
     * 博主的个人介绍地址
     *
     * Intro page about blogger
     */
    intro?: string;
    /**
     * 媒体链接配置
     *
     * Media links configuration
     *
     * E.g.
     *
     * ```js
     * {
     *   QQ: "http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes",
     *   Qzone: "https://1178522294.qzone.qq.com/",
     *   Gmail: "mailto:zhangbowang1998@gmail.com",
     *   Zhihu: "https://www.zhihu.com/people/mister-hope",
     *   Steam: "https://steamcommunity.com/id/Mr-Hope/",
     *   Weibo: "https://weibo.com/misterhope",
     * }
     * ```
     */
    links?: Partial<Record<BlogMedia, string>>;
    /**
     * 时间轴自定义文字
     *
     * Custom text for timeline
     *
     * @default 'Yesterday once more'
     */
    timeline?: string;
    /**
     * 每页的文章数量
     *
     * Article number per page
     *
     * @default 10
     */
    perPage?: number;
};
