import Vue from 'vue';
import VueRouter from 'vue-router';

import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Stocks from './components/Stocks.vue';
import Portfolio from './components/Portfolio.vue';
import Catch from './components/Error.vue';
import Signup from './components/Signup.vue';
import Signin from './components/Signin.vue';

Vue.use(VueRouter);

const token = () => localStorage.getItem('token');

const routes = [
	{ path: '', component: Home, components: {
		default: Home,
		'header-top': Header,
	}, beforeEnter(to, from, next) { 
		(!token()) ? next('/signin') : next(); 
	} },
	{ path: '/signin', component: Signin, components: {
		default: Signin,
		'header-top': Header,
	}, beforeEnter(to, from, next) { 
		(token()) ? next('/') : next(); 
	} },
	{ path: '/signup', component: Signup, components: {
		default: Signup,
		'header-top': Header,
	}, beforeEnter(to, from, next) { 
		(token()) ? next('/') : next();  
	} },
	{ path: '/portfolio', component: Portfolio, components: {
		default: Portfolio,
		'header-top': Header,
	}, beforeEnter(to, from, next) { 
		(token()) ? next() : next('/signin'); 
	} },
	{ path: '/stocks', component: Stocks, components: {
		default: Stocks,
		'header-top': Header,
	}, beforeEnter(to, from, next) { 
		(token()) ? next() : next('/signin'); 
	} },
	{ path: '*', component: Catch, components: {
		default: Catch
	} }
];

export default new VueRouter({ mode: 'history', routes })