import Vue from 'vue';
import Vuex from 'vuex';

// import modules
import * as actions from './modules/actions.js';
import * as mutations from './modules/mutations.js';
import * as getters from './modules/getters.js';

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