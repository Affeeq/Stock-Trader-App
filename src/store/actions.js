export const createdRandomNum = ({ commit }) => {
	commit('createdRandomNum');
}

export const endDay = ({ commit }) => {
	commit('endDay');
}

export const buyStocks = ({ commit }, payload) => {
	commit('buyStocks', payload);
}

export const sellStocks = ({ commit }, payload) => {
	commit('sellStocks', payload);
}

export const fetch = ({ commit }, payload) => {
	commit('fetch', payload);
}

export const clear = ({ commit }, payload) => {
	commit('clear', payload);
}