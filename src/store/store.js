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
			} else if (!payload.stock.bought) {
				payload.stock.bought = true;
				state.portfolio.push({ name: payload.stock.name, price: payload.stock.price, quantity: state.quantity[payload.index] });
				state.quantity.splice(payload.index, 1, '');
			} else {
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
				payload.pf.quantity = Number(payload.pf.quantity) - parseInt(payload.quantity[payload.index]);
				state.quantity.splice(payload.index, 1, '');
			} else {
				for (let stock of state.stocks) {
					if (stock.name == payload.pf.name) {
						stock.bought = false;
						break;
					}
				}
				state.quantity.splice(payload.index, 1, '');
				return state.portfolio.splice(payload.index, 1);
			}
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
		}
	}
});