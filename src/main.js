import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes';
import { store } from './store/store.js';

// app config
Vue.use(VueRouter);

// accessing routes
const router = new VueRouter({
	routes,
	mode: 'history'
});


// root vue instance
new Vue({
	el: '#app',
	router,
	store,
	created() {
    	this.$store.dispatch('stocks/createdRandomNum');
	},
	render: h => h(App)
})
