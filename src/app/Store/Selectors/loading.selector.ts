
export const loadingSelector: (state: { loading: boolean }) => boolean = (state: { loading: boolean }): boolean => state.loading;

/**
 *  createSelector
export const loadingSelector = createSelector(

  (state: {loading: boolean}) => state.loading,
  (loading) => loading
);
*/
