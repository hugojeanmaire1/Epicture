const initialState = {
    accessToken: '',
    accessTokenExpirationDate: '',
    authorizeAdditionalParameters: {},
    idToken: '',
    refreshToken: '',
    scopes: [],
    tokenAdditionalParameters: {},
    tokenType: '',
}

function LoginClient(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'LOGIN_TYPE':

        default:
            return state
    }
}

export default LoginClient;
