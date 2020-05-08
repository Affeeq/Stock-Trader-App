import resources from './resources/resources.js';
import router from '../../routes.js';

const state = {
	idToken: null,
	userId: null
}

const mutations = {
	authUser: (state, payload) => {
		state.idToken = payload.idToken;
		state.userId = payload.localId;
	},
	clearAuthUser: state => {
		state.idToken = null;
		state.userId = null;
	}
}

const actions = {
	fetch: ({ state, dispatch }) => {
		resources.data.getDb()
		.then(response => {
			return response.json();
		})
		.then(data => {
			dispatch('custom/fetch', {funds: data.funds}, {root: true});
			dispatch('stocks/fetch', {stocks: data.stocks}, {root: true});
			if (data.portfolio) {
				dispatch('portfolio/fetch', {portfolio: data.portfolio}, {root: true});
			}
		}, error => {
			console.log(error);
		});
	},
	submit: ({ state, rootState }) => {
		resources.data.saveDb({ portfolio: rootState.portfolio.portfolio, stocks: rootState.stocks.stocks, funds: rootState.custom.funds })
		.then(response => {
			return {messages: response.body};
		}, error => {
			console.log(error);
		});
	},
	signUp: ({commit, dispatch}, payload) => {
		resources.signUp.saveUser({
			email: payload.email,
			password: payload.password,
			returnSecureToken: true
		}).then(response => {
			console.log(response);
			commit('authUser', response.data);
			router.replace('/');
			dispatch('setLogoutTImer', response.data.expiresIn);
		}, error => {
			console.log(error);
		});
	},
	signIn: ({commit, dispatch}, payload) => {
		resources.signIn.saveUser({
			email: payload.email,
			password: payload.password,
			returnSecureToken: true
		}).then(response => {
			console.log(response);
			commit('authUser', response.data);
			router.replace('/');
			dispatch('setLogoutTImer', response.data.expiresIn);
		}, error => {
			console.log(error);
		});
	},
	logout: ({commit}) => {
		commit('clearAuthUser');
		router.replace('/signin');
	},
	setLogoutTImer: ({commit}, expirationTime) => {
		let time = expirationTime * 1000;
		setTimeout(() => { 
			commit('clearAuthUser');
			return router.replace('/signin');
		},time)
	}
};

const getters = {
	isAuthenticated: state => {
		return state.idToken !== null;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}