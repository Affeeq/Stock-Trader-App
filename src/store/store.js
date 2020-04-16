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
				state.stockQuantity.name = payload.name;
				state.portfolio.push({ name: payload.name, price: payload.price, quantity: state.stockQuantity.quantity });
			}
		},
		setQuantity: (state, payload) => {
			state.stockQuantity.quantity = payload;
		}
	},
	actions: {
		randomNum: ({ commit }) => {
			commit('randomNum');
		},
		buyStocks: ({ commit }, payload) => {
			commit('buyStocks', payload);
		},
		setQuantity: ({ commit }, payload) => {
			commit('setQuantity', payload);
		}
	}
});