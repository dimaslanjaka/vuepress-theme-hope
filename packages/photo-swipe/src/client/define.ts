import * as PhotoSwipe from "photoswipe";
import type PhotoSwipeDefaultUI from "photoswipe/dist/photoswipe-ui-default";

declare const IMAGE_CONTAINER: string;
declare const IMAGE_SELECTOR: string;
declare const PHOTOSWIPE_OPTIONS: PhotoSwipe.Options;
declare const PHOTOSWIPE_I18N: Record<
  string,
  PhotoSwipeDefaultUI.ShareButtonData[]
>;

export const imageContainer = IMAGE_CONTAINER;
export const imageSelector = IMAGE_SELECTOR;

export const i18n = PHOTOSWIPE_I18N;

export const options = PHOTOSWIPE_OPTIONS;
