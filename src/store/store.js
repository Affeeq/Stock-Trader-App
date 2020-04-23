import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		funds: 10000,
		portfolio: [],
		stocks: [
			{ name: 'BMW', price: '', bought: false },
			{ name: 'Google', price: '', bought: false },
			{ name: 'Apple', price: '', bought: false },
			{ name: 'Twitter', price: '', bought: false }
		],
		quantity: []
	},
	getters: {
		getFunds: state => {
			return state.funds;
		},
		getStocks: state => {
			return state.stocks;
		},
		getPorfolio: state => {
			return state.portfolio;
		}
	},
	mutations: {
		randomNum: state => {
			if (state.portfolio.length == 0) {
				for (let stock of state.stocks) {
					stock.price = (Math.floor(Math.random() * (150 - 50 + 1)) + 50);
				}
			} else {
				let price;
				for (let stock of state.stocks) {
					price = (Math.floor(Math.random() * (150 - 50 + 1)) + 50);
					for (let pf of state.portfolio) {
						if (pf.name == stock.name) {
							pf.price = price;
							break;
						}
					}
					stock.price = price;
				}
			}
		},
		buyStocks: (state, payload) => {
			if (!state.quantity[payload.index]) {
				console.log("Need to specify quantity")
			} else if (state.funds - (payload.stock.price * state.quantity[payload.index]) < 0) {
				console.log("Not enought funds");
			} else if (!payload.stock.bought) {
				payload.stock.bought = true;
				state.funds = state.funds - (payload.stock.price * state.quantity[payload.index]);
				state.portfolio.push({ name: payload.stock.name, price: payload.stock.price, quantity: state.quantity[payload.index], bought: payload.stock.bought });
				state.quantity.splice(payload.index, 1, '');
			} else {
				state.funds = state.funds - (payload.stock.price * state.quantity[payload.index]);
				for (let stock of state.portfolio) {
					if (stock.name === payload.stock.name) {
						stock.quantity = Number(state.quantity[payload.index]) + Number(stock.quantity);
						return state.quantity.splice(payload.index, 1, '');
					}
				}
			}
		},
		sellStocks: (state, payload) => {
			if ((Number(payload.pf.quantity) - parseInt(payload.quantity[payload.index]) ) < 0 ) {
				console.log('Cannot do that');
				state.quantity.splice(payload.index, 1, '');
			} else if ((Number(payload.pf.quantity) - parseInt(payload.quantity[payload.index]) ) > 0 ) {
				state.funds = state.funds + (payload.pf.price * state.quantity[payload.index]);
				payload.pf.quantity = Number(payload.pf.quantity) - parseInt(payload.quantity[payload.index]);
				state.quantity.splice(payload.index, 1, '');
			} else {
				for (let stock of state.stocks) {
					if (stock.name == payload.pf.name) {
						stock.bought = false;
						break;
					}
				}
				state.funds = state.funds + (payload.pf.price * state.quantity[payload.index]);
				state.quantity.splice(payload.index, 1, '');
				state.portfolio.splice(payload.index, 1);
			}
		},
		fetch: (state, payload) => {
			state.stocks = payload.stocks;
			state.portfolio.splice(0, state.portfolio.length);
			for (let data of payload.portfolio) {
				state.portfolio.push(data);
			}
			state.funds = payload.funds;
		},
		clear: (state, payload) => {
			state.quantity.splice(payload, 1, '');
		}
	},
	actions: {
		randomNum: ({ commit }) => {
			commit('randomNum');
		},
		buyStocks: ({ commit }, payload) => {
			commit('buyStocks', payload);
		},
		sellStocks: ({ commit }, payload) => {
			commit('sellStocks', payload);
		},
		fetch: ({ commit }, payload) => {
			commit('fetch', payload);
		},
		clear: ({ commit }) => {
			commit('clear');
		}
	}
});