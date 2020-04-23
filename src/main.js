import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue'
import { routes } from './routes';
import { store } from './store/store.js';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://the-stock-trader-6732a.firebaseio.com/';
Vue.http.interceptors.push((request, next) => {
	next(response => {
		response.json = () => {
			return {messages: response.body}
		}
	});
});

const router = new VueRouter({
	routes,
	mode: 'history'
});

new Vue({
	el: '#app',
	router,
	store,
	created() {
    	this.$store.dispatch('randomNum');
	},
	render: h => h(App)
})
