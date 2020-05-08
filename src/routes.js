import Vue from 'vue';
import VueRouter from 'vue-router';

import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Stocks from './components/Stocks.vue';
import Portfolio from './components/Portfolio.vue';
import Catch from './components/Error.vue';
import Signup from './components/Signup.vue';
import Signin from './components/Signin.vue';
import data from './store/modules/data.js';

Vue.use(VueRouter);

const routes = [
	{ path: '', component: Home, components: {
		default: Home,
		'header-top': Header,
	} },
	{ path: '/signin', component: Signin, components: {
		default: Signin,
		'header-top': Header,
	} },
	{ path: '/signup', component: Signup, components: {
		default: Signup,
		'header-top': Header,
	} },
	{ path: '/portfolio', component: Portfolio, components: {
		default: Portfolio,
		'header-top': Header,
	}, beforeEnter(to, from, next) { 
		(data.state.idToken) ? next() : next('/signin'); 
	} },
	{ path: '/stocks', component: Stocks, components: {
		default: Stocks,
		'header-top': Header,
	}, beforeEnter(to, from, next) { 
		(data.state.idToken) ? next() : next('/signin'); 
	} },
	{ path: '*', component: Catch, components: {
		default: Catch
	} }
];

export default new VueRouter({ mode: 'history', routes })