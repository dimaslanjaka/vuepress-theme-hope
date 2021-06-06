import { defineClientAppEnhance } from '@vuepress/client';

import '../styles/index.scss';

declare const DOCSEARCH_PROPS: unknown;

export default defineClientAppEnhance(({ app }) => {
    // // unregister the built-in `<OutboundLink>` to avoid warning
    // delete app._context.components.OutboundLink;
    // // override the built-in `<OutboundLink>`
    // app.component("OutboundLink", OutboundLink);

    // docsearch feature might not be commonly used, so we don't put it
    // into dependencies of default theme, but it is supported
    if (typeof DOCSEARCH_PROPS === 'undefined') {
        // register a mock `<Docsearch>` if docsearch plugin is not enabled
        app.component('Docsearch', () => null);
    }
});
