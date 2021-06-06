import { RevealOptions } from 'reveal.js';

export type RevealPlugin = 'highlight' | 'math' | 'search' | 'notes' | 'zoom' | 'anything' | 'audio' | 'chalkboard';

export interface PresentationOptions {
    plugins?: RevealPlugin[];
    revealConfig?: Partial<RevealOptions>;
}
