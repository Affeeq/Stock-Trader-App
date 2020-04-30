import Vue from 'vue';

const state = {
	node: 'data' 
};

const actions = {
	fetch: ({ state, dispatch }) => {
		Vue.http.get('{state.node}.json')
		.then(response => {
			return response.json();
		})
		.then(data => {
			dispatch('custom/fetch', {funds: data.funds}, {root: true});
			dispatch('stocks/fetch', {stocks: data.stocks}, {root: true});
			if (data.portfolio) {
				dispatch('portfolio/fetch', {portfolio: data.portfolio}, {root: true});
			}
		}, error => {
			console.log(error);
		});
	},
	submit: ({ state, rootState }) => {
		Vue.http.put('{state.node}.json', { portfolio: rootState.portfolio.portfolio, stocks: rootState.stocks.stocks, funds: rootState.custom.funds })
		.then(response => {
			return {messages: response.body};
		}, error => {
			console.log(error);
		});
	}
};

export default {
	namespaced: true,
	state,
	actions
}