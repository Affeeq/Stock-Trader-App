import Vue from 'vue';
import Vuex from 'vuex';

// import modules
import stocks from './modules/stocks.js';
import portfolio from './modules/portfolio.js';
import custom from './modules/custom.js';
import data from './modules/data.js';

// vuex config
Vue.use(Vuex);

// vuex instance using modules
export const store = new Vuex.Store({
	modules: {
		custom,
		stocks,
		portfolio,
		data
	}
});