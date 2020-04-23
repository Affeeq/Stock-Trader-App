import Vue from 'vue';
import Vuex from 'vuex';

// import root file
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

// vuex config
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
		quantity: [],
		currentQuantity: ''
	},
	getters,
	mutations,
	actions
});