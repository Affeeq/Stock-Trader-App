const state = {
	funds: 10000,
	currentQuantity: '' 
};

const getters = {
	getFunds: state => {
		return '$' + state.funds.toLocaleString();
	}
};

const mutations = {
	fetch: (state, payload) => {
		state.funds = payload.funds;
	},
	currentQuantity: (state, payload) => {
		console.log(payload)
		state.currentQuantity = payload;
	},
	minusFunds: (state, payload) => {
		return state.funds -= (Number(payload.stock.price) * Number(payload.currentQuantity));
	},
	addFunds: (state, payload) => {
		return state.funds += (Number(payload.portfolioPrice) * Number(payload.currentQuantity));
	},
	clearCurrentQuantity: (state, payload) => {
		state.currentQuantity = '';
	}
};

const actions = {
	currentQuantity: ({ commit }, payload) => {
		commit('currentQuantity', payload);
	},
	minusFunds: ({ commit }, payload) => {
		commit('minusFunds', payload);
	},
	addFunds: ({ commit }, payload) => {
		commit('addFunds', payload);
	},
	clearCurrentQuantity: ({ commit }, payload) => {
		commit('clearCurrentQuantity', payload);
	},
	fetch: ({ commit }, payload) => {
		commit('fetch', payload);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}