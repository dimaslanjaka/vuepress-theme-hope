declare module 'workbox-build' {
    export interface ManifestEntry {
        /** The URL to the asset in the manifest. */
        url: string;

        /**
         * The revision details for the file. This is a hash generated by node based on the file contents.
         */

        revision?: string;

        /**
         * Integrity metadata that will be used when making the network request for the URL.
         */
        integrity?: string;
    }

    export interface ManifestTransformResult {
        manifest: ManifestEntry[];

        warnings: (string | undefined)[];
    }

    /**
     * A ManifestTransform function can be used to modify the modify the url or revision properties of some or all of the ManifestEntries in the manifest.
     *
     * Deleting the revision property of an entry will cause the corresponding url to be precached without cache-busting parameters applied, which is to say, it implies that the URL itself contains proper versioning info. If the revision property is present, it must be set to a string.
     *
     * @param manifestEntries The full array of entries, prior to the current transformation.
     * @param compilation When used in the webpack plugins, this param will be set to the current compilation.
     */
    export type ManifestTransform = (
        manifestEntries: ManifestEntry[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        compilation?: Record<string, any>
    ) => Promise<ManifestTransformResult> | ManifestTransformResult;

    export interface HandlerContext {
        /**
         * The corresponding request.
         */
        request: Request | string;
        /**
         * The request’s URL.
         */
        url: URL;
        /**
         * The corresponding event that triggered the request.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        event: Event & Record<string, any>;
        /**
         * Array or Object parameters returned by the Route’s match callback. This will be undefined if an empty array or object were returned.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params?: any[] | Record<string, any>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type HandlerCallback<T = any> = (context: HandlerContext) => Promise<T>;

    export interface MatchContext {
        /**
         * The corresponding request.
         */
        request: Request | string;
        /**
         * The request’s URL.
         */
        url: URL;
        /**
         * The corresponding event that triggered the request.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        event: Event & Record<string, any>;
        /**
         * The result of comparing url.origin against the current origin.
         */
        sameOrigin: boolean;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export type MatchCallback<T = any> = (context: MatchContext) => T;

    export interface RuntimeCachingEntry {
        /**
         * Either the name of one of the built-in strategy classes, or custom handler callback to use when the generated route matches.
         */
        handler: string | HandlerCallback;

        /**
         * The value that will be passed to registerRoute(), used to determine whether the generated route will match a given request.
         */
        urlPattern: string | RegExp | MatchCallback;

        /**
         * The HTTP method that will match the generated route.
         */
        method?: string;
    }

    export interface GenerateSWOptions {
        /** The local directory you wish to match `globPatterns` against. The path is relative to the current directory. */
        globDirectory: string;
        /** The path and filename of the service worker file that will be created by the build process, relative to the current working directory. It must end in '.js'. */
        swDest: string;
        /** A list of entries to be precached, in addition to any entries that are generated as part of the build configuration. */
        additionalManifestEntries?: ManifestEntry[];
        /**
         * The targets to pass to `babel-preset-env` when transpiling the service worker bundle.
         */
        babelPresetEnvTargets?: string[];
        /** An optional ID to be prepended to cache names. This is primarily useful for local development where multiple sites may be served from the same http://localhost:port origin. */
        cacheId?: string;
        /** Whether or not Workbox should attempt to identify an delete any precaches created by older, incompatible versions. */
        cleanupOutdatedCaches?: boolean;
        /** Whether or not the service worker should start controlling any existing clients as soon as it activates. */
        clientsClaim?: boolean;
        /**
         * If a navigation request for a URL ending in / fails to match a precached URL, this value will be appended to the URL and that will be checked for a precache match. This should be set to what your web server is using for its directory index.
         */
        directoryIndex?: string;
        /**
         * Assets that match this will be assumed to be uniquely versioned via their URL, and exempted from the normal HTTP cache-busting that’s done when populating the precache. While not required, it’s recommended that if your existing build process already inserts a [hash] value into each filename, you provide a RegExp that will detect that, as it will reduce the bandwidth consumed when precaching.
         */
        dontCacheBustURLsMatching?: RegExp;
        /**
         * Determines whether or not symlinks are followed when generating the precache manifest. For more information, see the definition of follow in the glob documentation.
         */
        globFollow?: boolean;
        /**
         * Files matching any of these patterns will be included in the precache manifest. For more information, see the glob primer.
         */
        globPatterns?: string[];
        /**
         * A set of patterns matching files to always exclude when generating the precache manifest. For more information, see the definition of ignore in the glob documentation.
         */
        globIgnores?: string[];
        /**
         * If true, an error reading a directory when generating a precache manifest will cause the build to fail. If false, the problematic directory will be skipped. For more information, see the definition of strict in the glob documentation.
         */
        globStrict?: boolean;
        /**
         * Any search parameter names that match against one of the RegExp in this array will be removed before looking for a precache match. This is useful if your users might request URLs that contain, for example, URL parameters used to track the source of the traffic.
         */
        ignoreURLParametersMatching?: RegExp[];
        /**
         * A list of JavaScript files that should be passed to `importScripts()` inside the generated service worker file. This is useful when you want to let Workbox create your top-level service worker file, but want to include some additional code, such as a push event listener.
         */
        importScripts?: string[];
        /**
         * Whether the runtime code for the Workbox library should be included in the top-level service worker, or split into a separate file that needs to be deployed alongside the service worker. Keeping the runtime separate means that users will not have to re-download the Workbox code each time your top-level service worker changes.
         */
        inlineWorkboxRuntime?: boolean;
        /**
         * One or more functions which will be applied sequentially against the generated manifest. If modifyURLPrefix or dontCacheBustURLsMatching are also specified, their corresponding transformations will be applied first.
         */
        manifestTransforms?: ManifestTransform[];
        /**
         * This value can be used to determine the maximum size of files that will be precached. This prevents you from inadvertently precaching very large files that might have accidentally matched one of your patterns.
         */
        maximumFileSizeToCacheInBytes?: number;
        /**
         * If set to 'production', then an optimized service worker bundle that excludes debugging info will be produced. If not explicitly configured here, the process.env.NODE_ENV value will be used, and failing that, it will fall back to 'production'.
         */
        mode?: string;
        /**
         * A mapping of prefixes that, if present in an entry in the precache manifest, will be replaced with the corresponding value. This can be used to, for example, remove or add a path prefix from a manifest entry if your web hosting setup doesn’t match your local filesystem setup. As an alternative with more flexibility, you can use the manifestTransforms option and provide a function that modifies the entries in the manifest using whatever logic you provide.
         */
        modifyURLPrefix?: Record<string, string>;
        /**
         * If specified, all navigation requests for URLs that aren’t precached will be fulfilled with the HTML at the URL provided. You must pass in the URL of an HTML document that is listed in your precache manifest. This is meant to be used in a Single Page App scenario, in which you want all navigations to use common App Shell HTML.
         */
        navigateFallback?: string;
        /**
         * An optional array of regular expressions that restricts which URLs the configured navigateFallback behavior applies to. This is useful if only a subset of your site’s URLs should be treated as being part of a Single Page App. If both navigateFallbackDenylist and navigateFallbackAllowlist are configured, the denylist takes precedent.
         */
        navigateFallbackDenylist?: RegExp[];
        /**
         * An optional array of regular expressions that restricts which URLs the configured navigateFallback behavior applies to. This is useful if only a subset of your site’s URLs should be treated as being part of a Single Page App. If both navigateFallbackDenylist and navigateFallbackAllowlist are configured, the denylist takes precedent.
         */
        navigateFallbackAllowlist?: RegExp[];
        /**
         * Whether or not to enable navigation preload in the generated service worker. When set to true, you must also use runtimeCaching to set up an appropriate response strategy that will match navigation requests, and make use of the preloaded response.
         */
        navigationPreload?: boolean;
        /**
         * Controls whether or not to include support for offline Google Analytics. When true, the call to workbox-google-analytics’s initialize() will be added to your generated service worker. When set to an Object, that object will be passed in to the initialize() call, allowing you to customize the behavior.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        offlineGoogleAnalytics?: boolean | Record<string, any>;
        /**
         * Array of RuntimeCachingEntry
         */
        runtimeCaching?: RuntimeCachingEntry[];
        /**
         * Whether to add an unconditional call to skipWaiting() to the generated service worker. If false, then a message listener will be added instead, allowing you to conditionally call skipWaiting().
         */
        skipWaiting?: boolean;
        /**
         * Whether to create a sourcemap for the generated service worker files.
         */
        sourcemap?: boolean;
        /**
   * If a URL is rendered based on some server-side logic, its contents may depend on multiple files or on some other unique string value. The keys in this object are server-rendered URLs. If the values are an array of strings, they will be interpreted as glob patterns, and the contents of any files matching the patterns will be used to uniquely version the URL. If used with a single string, it will be interpreted as unique versioning information that you've generated for a given URL.

   */
        templatedURLs?: Record<string, string | string[]>;
    }

    export interface BuildInfo {
        count: number;
        filePaths: string[];
        size: number;
        warnings: string[];
    }

    export const generateSW: (options: GenerateSWOptions) => Promise<BuildInfo>;
}
