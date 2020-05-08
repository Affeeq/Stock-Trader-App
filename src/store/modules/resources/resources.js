import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const data = Vue.resource('https://stock-trader-app-v2.firebaseio.com', {}, {
	saveDb: {method: 'PUT', url: 'https://stock-trader-app-v2.firebaseio.com/data.json'},
	getDb: {method: 'GET', url: 'https://stock-trader-app-v2.firebaseio.com/data.json'}
});

const signUp = Vue.resource('https://identitytoolkit.googleapis.com/v1', {}, {
	saveUser: {method: 'POST' , url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUnTPZNITTBM9jV96JPsbEQDBfA4ydfNQ'}
});

const signIn = Vue.resource('https://identitytoolkit.googleapis.com/v1', {}, {
	saveUser: {method: 'POST' , url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUnTPZNITTBM9jV96JPsbEQDBfA4ydfNQ'}
});

export default {
	data,
	signUp,
	signIn
}