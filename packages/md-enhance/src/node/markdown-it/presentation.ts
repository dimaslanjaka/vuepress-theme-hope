/* eslint-disable max-statements */
import hash from 'hash-sum';
import * as MarkdownIt from 'markdown-it';
import { generateUML } from './utils';

export const presentation = (md: MarkdownIt): void => {
    md.block.ruler.before(
        'fence',
        'presentation',
        generateUML({
            name: 'presentation',
            open: 'slidestart',
            close: 'slideend',
        }),
        { alt: ['paragraph', 'reference', 'blockquote', 'list'] }
    );

    md.renderer.rules.presentation = (tokens, idx): string => {
        const token = tokens[idx];
        const key = `presentation-${hash(idx)}`;
        const { content, info } = token;

        return `<Presentation id="${key}" data-code="${encodeURIComponent(content)}" theme="${
            info.trim() || 'auto'
        }"></Presentation>`;
    };
};
