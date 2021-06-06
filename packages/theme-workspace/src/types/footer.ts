/**
 * 页脚配置
 *
 * Footer Settings
 */
export interface HopeFooterConfig {
    /**
     * 页脚的默认内容，可输入 HTMLString
     *
     * The default content for the footer, can accept HTMLString.
     */
    content?: string;
    /**
     * 默认的版权信息，设置为 `false` 来默认禁用它
     *
     * The default copyright info, set it to `false` to disable it by default.
     */
    copyright?: string | false;
    /**
     * 是否默认显示页脚
     *
     * Whether to display footer by default
     *
     * @default false
     */
    display?: boolean;
}
