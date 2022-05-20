const initState = {
    accessToken : "ovo je dummy access token"
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'CHANGE_USER_INFO') {
        return {
            ...state,
            email: action.email,
            password: action.password,
            accessToken: action.accessToken
        }
    }
    return state;
};

export default rootReducer;