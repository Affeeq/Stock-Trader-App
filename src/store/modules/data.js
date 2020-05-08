import resources from './resources/resources.js';

const state = {
	idToken: null,
	userId: null
}

const mutations = {
	authUser: (state, payload) => {
		state.idToken = payload.idToken;
		state.userId = payload.localId;
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
	signUp: ({commit}, payload) => {
		resources.signUp.saveUser({
			email: payload.email,
			password: payload.password,
			returnSecureToken: true
		}).then(response => {
			console.log(response);
			commit('authUser', response.data);
		}, error => {
			console.log(error);
		});
	},
	signIn: ({commit}, payload) => {
		resources.signIn.saveUser({
			email: payload.email,
			password: payload.password,
			returnSecureToken: true
		}).then(response => {
			console.log(response);
			commit('authUser', response.data);
		}, error => {
			console.log(error);
		});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
}