import { create } from 'zustand';
import { storeTokens, storeUser, clearAuthUser, getAuthUser } from "../helpers/token-helper";
import httpClient from '../helpers/http-client';

const loginUser = async (data) => {
    const response = await httpClient.post('/auth/login', data);
    return response.data;
}

const getUser = async () => {
    const result = await httpClient.get('/auth/user');
    return result.data;
}

const initialAuthState = () => {
    const initialState = {
        loading: false,
        accessToken: null,
        user: null,
    }
    const authUser = getAuthUser();
    if (authUser) {
        initialState.accessToken = authUser.accessToken;
        initialState.user = authUser.user;
    }

    return initialState;
}

const authStore = (set) => ({
    ...initialAuthState(),
    login: async (data) => {
        try {
            set({ loading: true })
            const tokens = await loginUser(data);
            if (tokens.accessToken) {
                storeTokens(tokens.accessToken, tokens.refreshToken);
                const user = await getUser();
                storeUser(user);
                set({ token: tokens.accessToken, user: user, loading: false });
                return;
            }
        } catch (err) {
            set({ loading: false });
            throw new Error(err.response.data);
        }
    },
    logout: () => {
        set({ token: null, user: null });
        clearAuthUser();
    },
    refreshUser: async (data) => {
        set((state) => ({ user: { ...state.user, ...data } }));
    },
});

const useAuthStore = create(authStore);
export default useAuthStore;