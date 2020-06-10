
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER'

export const clearCurrentUser = () => dispatch => {
     return dispatch({ type: 'CLEAR_CURRENT_USER', payload: null })
}