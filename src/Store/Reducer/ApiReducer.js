const initialState = {
    apiInfo: {},
}

function LoginClient(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'LOGIN_TYPE':
            return {...state, apiInfo: action.data}
        default:
            return state
    }
}

export default LoginClient;
