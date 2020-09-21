const { createSelector } = require("reselect");

const user = state => state.user;

export const selectCurrentUser = createSelector(
    [user],
    user => user.currentUser
);