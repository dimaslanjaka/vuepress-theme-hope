import { RouteLocation, Router } from 'vue-router';

/**
 * @param url navigate link
 * @param router router
 * @param route current route
 */
export const navigate = (url: string, router: Router, route: RouteLocation): void => {
    if (url)
        if (url.startsWith('/')) {
            // Inner absolute path
            if (route.path !== url) void router.push(url);
        } else if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
            // Outter url
            if (window) window.open(url);
        } else {
            // Inner relative path
            const base = route.path.slice(0, route.path.lastIndexOf('/'));

            void router.push(`${base}/${encodeURI(url)}`);
        }
};
