const state = {
	stocks: [
	{ name: 'BMW', price: '', bought: false },
	{ name: 'Google', price: '', bought: false },
	{ name: 'Apple', price: '', bought: false },
	{ name: 'Twitter', price: '', bought: false }
	]
};

const getters = {
	getStocks: state => {
		return state.stocks;
	}
};

const mutations = {
	createdRandomNum: state => {
		state.stocks.map(stock => stock.price = (Math.floor(Math.random() * (150 - 50 + 1)) + 50));
	},
	buyStocks: (state, payload) => {
	 	state.stocks.find(stock => stock.name === payload.name).bought = true;
	},
	deleteStocks: (state, payload) => {
		state.stocks.find(stock => stock.name === payload.portfolio.name).bought = false;
	},
	fetch: (state, payload) => {
		state.stocks.splice(0, state.stocks.length);
		payload.stocks.map(data => state.stocks.push(data));
	}
};

const actions = {
	buyStocks: ({ dispatch, commit, rootState }, payload) => {
		(!payload.bought) 	? newStock(dispatch, commit, payload)
							: addStock(dispatch, payload, rootState);

		//////////// functions for buying stocks conditional /////////////////////

		function newStock(dispatch, commit, payload) {
			commit('buyStocks', payload);
			dispatch('custom/minusFunds', {stock: payload, currentQuantity: rootState.custom.currentQuantity}, {root: true});
			dispatch('portfolio/newStock', {stock: payload, currentQuantity: rootState.custom.currentQuantity}, {root: true});
			dispatch('custom/clearCurrentQuantity', {}, {root: true});
		}

		function addStock(dispatch, payload, rootState) {
			dispatch('portfolio/addStock', {stockName: payload.name, currentQuantity: rootState.custom.currentQuantity}, {root: true});
			dispatch('custom/minusFunds', {stock: payload, currentQuantity: rootState.custom.currentQuantity}, {root: true});
			dispatch('custom/clearCurrentQuantity', {}, {root: true});
		}
	},
	deleteStocks: ({ commit }, payload) => {
		commit('deleteStocks', payload);
	},
	createdRandomNum: ({ commit }) => {
		commit('createdRandomNum');
	},
	endDay: ({ dispatch, commit, state }) => {
		commit('createdRandomNum');
		dispatch('portfolio/endDay', {stocks: state.stocks}, { root: true });
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