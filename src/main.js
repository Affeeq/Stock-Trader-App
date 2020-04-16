import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes';
import { store } from './store/store.js';

Vue.use(VueRouter);

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
