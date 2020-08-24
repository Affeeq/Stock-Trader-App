const state = {
	portfolio: []
};

const getters = {
	getPortfolio: state => {
		return state.portfolio;
	}
};

const mutations = {
	endDay: (state, payload) => {
		if (state.portfolio.length) {
			state.portfolio.map(pf => pf.price = payload.stocks.find(stock => stock.name === pf.name).price);
		}
	},
	deleteStocks: (state, payload) => {
		state.portfolio.splice(payload.portfolioIndex, 1);
	},
	sellStocks: (state, payload) => {
		return state.portfolio.find(pf => pf.name === payload.portfolioName).quantity -= payload.currentQuantity;
	},
	newStock: (state, payload) => {
		return state.portfolio.push({ name: payload.stock.name, price: payload.stock.price, quantity: payload.currentQuantity, bought: payload.stock.bought });
	},
	addStock: (state, payload) => {
		return state.portfolio.find(pf => pf.name === payload.stockName).quantity =  Number(payload.currentQuantity) + Number(state.portfolio.find(pf => pf.name === payload.stockName).quantity);
	},
	fetch: (state, payload) => {
		state.portfolio.splice(0, state.portfolio.length);
		payload.portfolio.map(data =>  state.portfolio.push(data));
	}
};

const actions = {
	sellStocks: ({ dispatch, commit, rootState }, payload) => {
		(!rootState.custom.currentQuantity) 		? alert('Specify a quantity to sell')
		: (checkQuantity(rootState, payload) === 0)	? deleteStock(dispatch, commit, payload, rootState)
		: (checkQuantity(rootState, payload) < 0)	? alert('Not enough quantity') 
													: sellStocks(dispatch, commit, payload, rootState);

		//////////// functions for selling stocks conditional /////////////////////
		function checkQuantity(rootState, payload) {
			return Number(payload.portfolioStock.quantity) - rootState.custom.currentQuantity;
		}

		function deleteStock(dispatch, commit, payload, rootState) {
			commit('deleteStocks', {portfolioIndex: payload.index});
			dispatch('stocks/deleteStocks', {portfolio: payload.portfolioStock}, {root: true});
			dispatch('custom/addFunds', {portfolioPrice: payload.portfolioStock.price, currentQuantity: rootState.custom.currentQuantity}, {root: true});
			dispatch('custom/clearCurrentQuantity', {}, {root: true});
		}

		function sellStocks(dispatch, commit, payload, rootState) {
			commit('sellStocks', {portfolioName: payload.portfolioStock.name, currentQuantity: rootState.custom.currentQuantity});
			dispatch('custom/addFunds', {portfolioPrice: payload.portfolioStock.price, currentQuantity: rootState.custom.currentQuantity}, {root: true});
			dispatch('custom/clearCurrentQuantity', {}, {root: true});
		}
	},
	endDay: ({ commit }, payload) => {
		commit('endDay', payload);
	},
	newStock: ({ commit }, payload) => {
		commit('newStock', payload);
	},
	addStock: ({ commit }, payload) => {
		commit('addStock', payload);
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