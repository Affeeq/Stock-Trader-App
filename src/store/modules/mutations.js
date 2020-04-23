export const createdRandomNum = state => {
	for (let stock of state.stocks) {
		stock.price = (Math.floor(Math.random() * (150 - 50 + 1)) + 50);
	}
}

export const endDay = state => {
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

export const buyStocks = (state, payload) => {
	if (!state.currentQuantity) {
		console.log("Need to specify quantity")
	} else if (state.funds - (payload.price * state.currentQuantity) < 0) {
		console.log("Not enought funds");
	} else if (!payload.bought) {
		payload.bought = true;
		state.funds = state.funds - (payload.price * state.currentQuantity);
		state.portfolio.push({ name: payload.name, price: payload.price, quantity: state.currentQuantity, bought: payload.bought });
		state.currentQuantity = '';
	} else {
		state.funds = state.funds - (payload.price * state.currentQuantity);
		for (let stock of state.portfolio) {
			if (stock.name === payload.name) {
				return stock.quantity = Number(state.currentQuantity) + Number(stock.quantity);
			}
		}
		state.currentQuantity = '';
	}
}

export const sellStocks = (state, payload) => {
	if (!state.currentQuantity) {
		console.log('Need to specify quantity');
	} else if ((Number(payload.pf.quantity) - state.currentQuantity ) < 0 ) {
		console.log('Cannot do that');
	} else if ((Number(payload.pf.quantity) - state.currentQuantity ) > 0 ) {
		state.funds = state.funds + (payload.pf.price * state.currentQuantity);
		payload.pf.quantity = Number(payload.pf.quantity) - state.currentQuantity;
		state.currentQuantity = '';
	} else {
		for (let stock of state.stocks) {
			if (stock.name == payload.pf.name) {
				stock.bought = false;
				break;
			}
		}
		state.funds = state.funds + (payload.pf.price * state.currentQuantity);
		state.portfolio.splice(payload.index, 1);
		state.currentQuantity = '';
	}
}

export const fetch = (state, payload) => {
	state.stocks = payload.stocks;
	state.portfolio.splice(0, state.portfolio.length);
	if (payload.portfolio) {
		for (let data of payload.portfolio) {
			state.portfolio.push(data);
		}
	}
	state.funds = payload.funds;
}

export const clear = (state, payload) => {
	state.currentQuantity = state.quantity[payload];
	state.currentQuantity == 0 || !state.currentQuantity ? state.currentQuantity = '' : state.currentQuantity = state.quantity[payload];
	state.quantity.splice(payload, 1, '');
}