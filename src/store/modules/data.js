import resources from './resources/resources.js';
import router from '../../routes.js';

const state = {
	idToken: null,
	userId: null,
	emailRegistered: null
}

const mutations = {
	authUser: (state, payload) => {
		state.idToken = payload.idToken;
		state.userId = payload.localId;
	},
	clearAuthUser: state => {
		state.idToken = null;
		state.userId = null;
	},
	checkEmailRegistered: (state, isEmailRegistered) => {
		state.emailRegistered = isEmailRegistered;
	}
}

const actions = {
	fetch: ({ state, dispatch }) => {
		resources.data.getDb()
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
		resources.data.saveDb({ portfolio: rootState.portfolio.portfolio, stocks: rootState.stocks.stocks, funds: rootState.custom.funds })
		.then(response => {
			return {messages: response.body};
		}, error => {
			console.log(error);
		});
	},
	signUp: ({commit, dispatch}, payload) => {
		resources.signUp.saveUser({
			email: payload.email,
			password: payload.password,
			returnSecureToken: true
		}).then(response => {
			console.log(response);
			commit('authUser', response.data);
			router.replace('/');
			const now = new Date();
			const expirationDate = new Date(now.getTime() + response.data.expiresIn * 1000);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('userId', response.data.localId);
			localStorage.setItem('expirationDate', expirationDate);
			dispatch('setLogoutTImer', response.data.expiresIn);
		}, error => {
			console.log(error);
			// need to push the error in component 
		});
	},
	signIn: ({commit, dispatch}, payload) => {
		resources.signIn.saveUser({
			email: payload.email,
			password: payload.password,
			returnSecureToken: true
		}).then(response => {
			console.log(response);
			commit('authUser', response.data);
			router.replace('/');
			const now = new Date();
			const expirationDate = new Date(now.getTime() + response.data.expiresIn * 1000);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('userId', response.data.localId);
			localStorage.setItem('expirationDate', expirationDate);
			dispatch('setLogoutTImer', response.data.expiresIn);
		}, error => {
			console.log(error);
		});
	},
	autoSignin: ({commit}) => {
		const token = localStorage.getItem('token');
		if (!token) {
			return
		}
		const now = new Date();
		const expirationDate = localStorage.getItem('expirationDate');
		if (now >= expirationDate) {
			return
		}
		const userId = localStorage.getItem('userId');
		commit('authUser', {
			idToken: token,
			localId: userId
		});
	},
	logout: ({commit}) => {
		commit('clearAuthUser');
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('expirationDate');
		router.replace('/signin');
	},
	setLogoutTImer: ({commit}, expirationTime) => {
		let time = expirationTime * 1000;
		setTimeout(() => { 
			commit('clearAuthUser');
			return router.replace('/signin');
		},time)
	},
	checkEmailExist: ({commit}, {email, uri}) => {
		resources.emailExist.fetch({
			identifier: email,
			continueUri: uri
		}).then(response => {
			// extract registered object
			commit('checkEmailRegistered', response.data.registered);
			console.log(response.data.registered);
		}).catch(error => {
			console.log(error);
		});
	}
};

const getters = {
	isAuthenticated: state => {
		return state.idToken !== null;
	},
	isEmailRegistered: state => {
		return state.emailRegistered;
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}