const { createSelector } = require("reselect");

const loader = state => state.loader;

export const selectIsLoading = createSelector(
    [loader],
    loader => loader.isLoading
);