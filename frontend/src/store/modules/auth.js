import Config from '../../config/config';
import router from "../../router";

export default {
    namespaced: true,
    state: {
        errors: {}
    },
    mutations: {
        CHECK_REGISTER_ERRORS(state, response) {
            if (response.status === true) {
                router.push('/auth/login');
            }

            state.errors = [];
            for (let error of response) {
                state.errors[error.field] = error.message;
            }
        },
        SET_USER(state, response) {
            if (Array.isArray(response) && response.length) {
                state.errors = [];
                for (let error of response) {
                    state.errors[error.field] = error.message;
                }
            } else if (response.id) {
                localStorage.setItem(Config.tokenKey, response.access_token);
                localStorage.setItem(Config.userKey, JSON.stringify(response));

                router.push('/');
            }
        },
        LOGOUT() {
            localStorage.removeItem(Config.tokenKey);
            localStorage.removeItem(Config.userKey);

            router.push('/auth/login');
        }
    },
    actions: {
        async registerUser({ commit }, formData) {
            const response = await fetch(Config.restDomainUrl + '/user/register', {
                method: 'POST',
                headers: Config.getHeaders({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(formData)
            });

            commit('CHECK_REGISTER_ERRORS', await response.json());
        },
        async loginUser({ commit }, formData) {
            const response = await fetch(Config.restDomainUrl + '/user/login', {
                method: 'POST',
                headers: Config.getHeaders({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(formData)
            });

            commit('SET_USER', await response.json());
        },
        async logoutUser({ commit }) {
            commit('LOGOUT');
        }
    },
    getters: {
        getErrors(state) {
            return state.errors;
        },
        getUser() {
            return JSON.parse(localStorage.getItem(Config.userKey));
        },
        isAuthenticated() {
            return !!localStorage.getItem(Config.tokenKey);
        }
    }
}