

export const index = {
    init: () => (dispatch, getState) => dispatch({
        type: 'index',
        newState: (state, action, init_state) => {
            return {
                ...state,
                location: window.location,
            };
        },
    }),
}



