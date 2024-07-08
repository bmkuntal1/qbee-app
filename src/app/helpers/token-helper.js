const tokenKey = "MOURLI_APP_TOKEN";

// Local storage functions
export const storeTokens = (token, refreshToken) => {
    const authUser = getAuthUser();
    var auth = { token, refreshToken };
    if (authUser && authUser.user) {
        auth.user = authUser.user;
    }
    localStorage.setItem(tokenKey, JSON.stringify(auth));
};

export const storeUser = (user) => {
    const { token, refreshToken } = getAuthUser();
    var auth = { user };
    if (token) {
        auth.token = token;
        auth.refreshToken = refreshToken;
    }
    localStorage.setItem(tokenKey, JSON.stringify(auth));
};

export const getAuthUser = () => {
    const auth = localStorage.getItem(tokenKey);
    if (!auth) {
        return null;
    }
    return JSON.parse(auth);
};

export const clearAuthUser = () => {
    localStorage.removeItem(tokenKey);
}