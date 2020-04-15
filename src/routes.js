import Header from './components/Header.vue';
import Home from './components/Home.vue';

export const routes = [
	{ path: '', component: Home, components: {
		default: Home,
		'header-top': Header,
	} }
];