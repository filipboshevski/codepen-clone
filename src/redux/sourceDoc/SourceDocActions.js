import sourceDocTypes from './SourceDocTypes';

export const updateHtml = html => ({
    type: sourceDocTypes.UPDATE_HTML,
    payload: html
});

export const updateCss = css => ({
    type: sourceDocTypes.UPDATE_CSS,
    payload: css
});

export const updateJs = js => ({
    type: sourceDocTypes.UPDATE_JS,
    payload: js
});