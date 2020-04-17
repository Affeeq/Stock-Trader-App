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
		stockQuantity: { name: '', quantity: '' }
	},
	getters: {
		setQuantity: state => {
			return state.stockQuantity;
		}
	},
	mutations: {
		randomNum: state => {
			for (let stock of state.stocks) {
				stock.price = (Math.floor(Math.random() * (150 - 50 + 1)) + 50);
			}
		},
		buyStocks: (state, payload) => {
			if (!payload.bought) {
				payload.bought = true;
				state.portfolio.push({ name: payload.name, price: payload.price, quantity: state.stockQuantity.quantity });
				state.stockQuantity.quantity = '';
			} else {
				for (let stock of state.portfolio) {
					if (stock.name === payload.name) {
						return stock.quantity = Number(state.stockQuantity.quantity) + Number(stock.quantity);
					}
				}
			}
		},
		sellStocks: (state, payload) => {
			if ((Number(payload.quantity) - Number(state.stockQuantity.quantity)) < 0 ) {
				console.log('Cannot do that');
			} else if ((Number(payload.quantity) - Number(state.stockQuantity.quantity)) > 0 ) {
				payload.quantity = Number(payload.quantity) - Number(state.stockQuantity.quantity);
			} else {
				let counter = 0;
				for (let stock of state.portfolio) {
					if ( ( Number(stock.quantity) - Number(payload.quantity) ) == 0 )  {
						return state.portfolio.splice(counter, 1);
					} else {
						counter++;
					}
				}
			}
		},
		setQuantity: (state, payload) => {
			state.stockQuantity.quantity = payload;
		},
		setName: (state, payload) => {
			state.stockQuantity.name = payload;
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
		setQuantity: ({ commit }, payload) => {
			commit('setQuantity', payload);
		},
		setName: ({ commit }, payload) => {
			commit('setName', payload);
		}
	}
});