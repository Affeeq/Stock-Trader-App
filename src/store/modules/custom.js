const state = {
	funds: 10000,
	quantity: [], 
	currentQuantity: '' 
};

const getters = {
	getFunds: state => {
		return state.funds;
	}
};

const mutations = {
	fetch: (state, payload) => {
		state.funds = payload.funds;
	},
	clear: (state, payload) => {
		state.currentQuantity = state.quantity[payload];
		state.currentQuantity == 0 || !state.currentQuantity 	? state.currentQuantity = '' 
																: state.currentQuantity = state.quantity[payload];
		state.quantity.splice(payload, 1, '');
	},
	minusFunds: (state, payload) => {
		return state.funds -= (Number(payload.stock.price) * Number(payload.currentQuantity));
	},
	addFunds: (state, payload) => {
		return state.funds += (Number(payload.portfolioPrice) * Number(payload.currentQuantity));
	},
	clearCurrentQuantity: state => {
		state.currentQuantity = '';
	}
};

const actions = {
	clear: ({ commit }, payload) => {
		commit('clear', payload);
	},
	minusFunds: ({ commit }, payload) => {
		commit('minusFunds', payload);
	},
	addFunds: ({ commit }, payload) => {
		commit('addFunds', payload);
	},
	clearCurrentQuantity: ({ commit }) => {
		commit('clearCurrentQuantity');
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