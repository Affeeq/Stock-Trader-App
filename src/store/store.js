import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		funds: 10000,
		portfolio: [],
		stocks: [
			{ name: 'BMW', price: '' },
			{ name: 'Google', price: '' },
			{ name: 'Apple', price: '' },
			{ name: 'Twitter', price: '' }
		]
	},
	mutations: {
		randomNum: state => {
			for (let stock of state.stocks) {
				stock.price = (Math.floor(Math.random() * (150 - 50 + 1)) + 50);
			}
		},
		buyStocks: (state, payload) => {
			state.portfolio.push(payload);
		}
	},
	actions: {
		randomNum: ({ commit }) => {
			commit('randomNum');
		},
		buyStocks: ({ commit }, payload) => {
			commit('buyStocks', payload);
		}
	}
});