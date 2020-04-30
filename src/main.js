import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue'
import { routes } from './routes';
import { store } from './store/store.js';

// app config
Vue.use(VueRouter);
Vue.use(VueResource);

// root link to DB
Vue.http.options.root = 'https://the-stock-trader-6732a.firebaseio.com/';

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
