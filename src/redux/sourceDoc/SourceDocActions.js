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

export const saveSrcDocStart = (srcDoc, currentUser) => ({
    type: sourceDocTypes.SAVE_DOC_START,
    payload: {srcDoc, currentUser}
});

export const saveSrcDocSuccess = response => ({
    type: sourceDocTypes.SAVE_DOC_SUCCESS,
    payload: response
});

export const loadSrcDoc = srcDoc => ({
    type: sourceDocTypes.LOAD_SRC_DOC,
    payload: srcDoc
});