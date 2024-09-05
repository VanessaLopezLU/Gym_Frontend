// store.js
import { createStore } from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      usuario: null,
      token: null,
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, usuario) {
      state.usuario = usuario;
    },
    clearAuthData(state) {
      state.usuario = null;
      state.token = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/login', credentials);
        const { data } = response;
        commit('setToken', data.access_token);
        commit('setUser', data.usuario);
        return data;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearAuthData');
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    getUser(state) {
      return state.usuario;
    },
    getRole(state) {
      return state.usuario?.role || null;
    },
  },
  plugins: [createPersistedState()],
});
export default store;
