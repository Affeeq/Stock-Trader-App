import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Stocks from './components/Stocks.vue';
import Portfolio from './components/Portfolio.vue';

export const routes = [
	{ path: '', component: Home, components: {
		default: Home,
		'header-top': Header,
	} },
	{ path: '/portfolio', component: Portfolio, components: {
		default: Portfolio,
		'header-top': Header,
	} },
	{ path: '/stocks', component: Stocks, components: {
		default: Stocks,
		'header-top': Header,
	} }
];