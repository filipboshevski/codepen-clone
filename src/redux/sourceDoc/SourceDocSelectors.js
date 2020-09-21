const { createSelector } = require("reselect");

const srcDoc = state => state.srcDoc;

export const selectHtml = createSelector(
    [srcDoc],
    srcDoc => srcDoc.html
);

export const selectCss = createSelector(
    [srcDoc],
    srcDoc => srcDoc.css
);

export const selectJs = createSelector(
    [srcDoc],
    srcDoc => srcDoc.js
);