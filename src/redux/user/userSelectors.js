const { createSelector } = require("reselect");

const user = state => state.user;

export const selectCurrentUser = createSelector(
    [user],
    user => user ? user.currentUser : null
);

export const selectProjectName = createSelector(
    [selectCurrentUser],
    currentUser => currentUser ? (currentUser.projectName) : null
)