export const createdRandomNum = state => {
	state.stocks.map(stock => stock.price = (Math.floor(Math.random() * (150 - 50 + 1)) + 50));
}

export const endDay = state => {
	state.stocks.map(stock => stock.price = (Math.floor(Math.random() * (150 - 50 + 1)) + 50));
	if (state.portfolio.length) {
		state.portfolio.map(pf => pf.price = state.stocks.find(stock => stock.name === pf.name).price);
	}
}

export const buyStocks = (state, payload) => {
	function newStock(state, payload) {
		payload.bought = true;
		state.funds -= (payload.price * state.currentQuantity);
		state.portfolio.push({ name: payload.name, price: payload.price, quantity: state.currentQuantity, bought: payload.bought });
		state.currentQuantity = '';
	}

	function addStock(state, payload) {
		state.funds -= (payload.price * state.currentQuantity);
		state.portfolio.find(pf => pf.name === payload.name).quantity =  Number(state.currentQuantity) + Number(state.portfolio.find(pf => pf.name === payload.name).quantity);
		state.currentQuantity = '';
	}

	function checkFunds(state, payload) {
		return state.funds - (payload.price * state.currentQuantity) < 0;
	}

	(!state.currentQuantity) 		? alert('Specify a quantity to buy') 
	: checkFunds(state, payload) 	? alert('Not enough funds!')
	: (!payload.bought) 			? newStock(state, payload)
									: addStock(state, payload);
}

export const sellStocks = (state, payload) => {
	function sellStock(state, payload) {
		state.funds += (payload.pf.price * state.currentQuantity);
		payload.pf.quantity -=  state.currentQuantity;
		state.currentQuantity = '';
	}

	function deleteStock(state, payload) {
		state.stocks.find(stock => stock.name == payload.pf.name).bought = false;
		state.funds += (payload.pf.price * state.currentQuantity);
		state.portfolio.splice(payload.index, 1);
		state.currentQuantity = '';
	}

	function checkQuantity(state, payload) {
		return Number(payload.pf.quantity) - state.currentQuantity;
	}

	(!state.currentQuantity) 				? alert('Specify a quantity to sell')
	: (checkQuantity(state, payload) === 0)	? deleteStock(state, payload)
	: (checkQuantity(state, payload) < 0)	? alert('Not enough quantity')
											: sellStock(state, payload);
}

export const fetch = (state, payload) => {
	state.stocks = payload.stocks;
	state.portfolio.splice(0, state.portfolio.length);
	if (payload.portfolio) {
		payload.portfolio.map(data =>  state.portfolio.push(data));
	}
	state.funds = payload.funds;
}

export const clear = (state, payload) => {
	state.currentQuantity = state.quantity[payload];
	state.currentQuantity == 0 || !state.currentQuantity 	? state.currentQuantity = '' 
															: state.currentQuantity = state.quantity[payload];
	state.quantity.splice(payload, 1, '');
}